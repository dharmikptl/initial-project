import { IsEmail, IsIn, Length, Matches } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { IsEmailAlreadyExist } from '../../validators/isEmailAlreadyExist'

@InputType()
export class SignUpInput {
  @Field()
  @Length(8, 20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message: 'password too weak'
  })
  password: string

  @Field()
  @Length(1, 255)
  role: string

  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsIn(['male', 'female', 'other'])
  gender: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email already in use' })
  email: string
}
