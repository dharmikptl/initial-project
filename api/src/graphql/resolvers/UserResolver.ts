import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { Not } from 'typeorm'
import { User } from '../../entity/User'
import { RefreshToken } from '../../entity/RefreshToken'
import { SignUpInput } from '../types/SignUpInput'
import { SignInInput } from '../types/SignInInput'
import { AuthenticatedResponse } from '../types/AuthenticatedResponse'
import { sendRefreshToken } from '../../functions/sendRefreshToken'
import { UpdateMeInput } from '../types/UpdateMeInput'
import { UpdatePasswordInput } from '../types/UpdatePasswordInput'
import { googleAuthClient } from '../../auth/googleAuthClient'
import { generateTokens } from '../../functions/generateTokens'

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello(): string {
    return 'world'
  }

  @Mutation(() => User)
  async signUp(
    @Arg('data')
    { firstName, lastName, email, password, role, gender }: SignUpInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      gender
    }).save()
    return user
  }

  @Mutation(() => AuthenticatedResponse, { nullable: true })
  async signIn(
    @Arg('data') { email, password }: SignInInput,
    @Ctx() ctx: any
  ): Promise<AuthenticatedResponse | undefined> {
    const userAgent = ctx.req.headers['user-agent']
    if (!userAgent) return
    const user = await User.findOne({ where: { email } })
    if (!user || !user.isActive) return
    if (!(await bcrypt.compare(password, user.password))) return
    const { accessToken, refreshToken, issuedAt, expiresAt } =
      generateTokens(user)
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      userAgent
    }).save()
    sendRefreshToken(ctx.res, refreshToken)
    return {
      userId: user.id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
      accessToken,
      issuedAt,
      expiresAt
    }
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: any): Promise<User | undefined> {
    return await User.findOne({ where: { id: ctx.req.user.id } })
  }

  @Query(() => AuthenticatedResponse, { nullable: true })
  async refreshToken(
    @Ctx() ctx: any
  ): Promise<AuthenticatedResponse | undefined> {
    const token = ctx.req.signedCookies.refreshToken
    if (!token) return
    const userAgent = ctx.req.headers['user-agent']
    if (!userAgent) return
    const foundRefreshToken = await RefreshToken.findOne({ where: { token } })
    if (!foundRefreshToken || !foundRefreshToken.isActive) return
    const user = await User.findOne({ where: { id: foundRefreshToken.userId } })
    if (!user) return
    if (!user.isActive) return
    const { accessToken, refreshToken, issuedAt, expiresAt } =
      generateTokens(user)
    foundRefreshToken.token = refreshToken
    foundRefreshToken.userAgent = userAgent
    await foundRefreshToken.save()
    sendRefreshToken(ctx.res, refreshToken)
    return {
      userId: user.id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
      accessToken,
      issuedAt,
      expiresAt
    }
  }

  @Mutation(() => String)
  async signOut(@Ctx() ctx: any): Promise<string> {
    const token = ctx.req.signedCookies.refreshToken
    if (!token) return 'sign out successful'
    await RefreshToken.update({ token, isActive: true }, { isActive: false })
    sendRefreshToken(ctx.res, '')
    return 'sign out successful'
  }

  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateMe(
    @Arg('data')
    { firstName, lastName, gender, profileImage }: UpdateMeInput,
    @Ctx()
    ctx: any
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { id: ctx.req.user.id } })
    if (!user) return
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (gender) user.gender = gender
    if (profileImage) user.profileImage = profileImage
    await user.save()
    return user
  }

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async updatePassword(
    @Arg('data') { currentPassword, newPassword }: UpdatePasswordInput,
    @Ctx() ctx: any
  ): Promise<string | undefined> {
    const token = ctx.req.signedCookies.refreshToken
    if (!token) return
    const foundRefreshToken = await RefreshToken.findOne({ where: { token } })
    if (!foundRefreshToken || !foundRefreshToken.isActive) return
    const user = await User.findOne({ where: { id: ctx.req.user.id } })
    if (!user) return
    if (!(await bcrypt.compare(currentPassword, user.password))) return
    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    return 'password updated successfully'
  }

  @Authorized()
  @Query(() => [RefreshToken], { nullable: true })
  async activeSessions(@Ctx() ctx: any): Promise<RefreshToken[] | undefined> {
    const token = ctx.req.signedCookies.refreshToken
    if (!token) return
    const userId = ctx.req.user.id
    return await RefreshToken.find({
      where: {
        userId,
        isActive: true,
        token: Not(token)
      }
    })
  }

  @Authorized()
  @Mutation(() => String, { nullable: true })
  async removeSession(
    @Arg('sessionId') sessionId: string,
    @Ctx() ctx: any
  ): Promise<string | undefined> {
    const token = ctx.req.signedCookies.refreshToken
    if (!token) return
    const userId = ctx.req.user.id
    await RefreshToken.update(
      { id: sessionId, userId, isActive: true, token: Not(token) },
      { isActive: false }
    )
    return 'session removed'
  }

  @Mutation(() => AuthenticatedResponse, { nullable: true })
  async googleSignIn(
    @Arg('idToken') idToken: string,
    @Ctx() ctx: any
  ): Promise<AuthenticatedResponse | undefined> {
    const userAgent = ctx.req.headers['user-agent']
    if (!userAgent) return
    let payload: any
    try {
      const data = await googleAuthClient.verifyIdToken({ idToken })
      payload = data.getPayload()
    } catch (err) {
      return
    }
    if (!payload) return
    const {
      sub: googleId,
      email,
      email_verified: emailVerified,
      name
    } = payload
    if (!googleId || !email || !emailVerified || !name) return
    const user = await User.findOne({ where: { email } })
    if (!user || !user.isActive) return
    if (!user.googleId) {
      user.googleId = googleId
      await user.save()
    } else if (user.googleId !== googleId) return
    const { accessToken, refreshToken, issuedAt, expiresAt } =
      generateTokens(user)
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      userAgent
    }).save()
    sendRefreshToken(ctx.res, refreshToken)
    return {
      userId: user.id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
      accessToken,
      issuedAt,
      expiresAt
    }
  }
}
