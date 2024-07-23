import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class AuthenticatedResponse {
  @Field(() => ID)
  userId: string

  @Field()
  role: string

  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  profileImage?: string

  @Field()
  accessToken: string

  @Field()
  issuedAt: number

  @Field()
  expiresAt: number
}
