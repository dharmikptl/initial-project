import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class SignInInput {
  @Field()
  @Length(1, 255)
  email: string

  @Field()
  @Length(1, 255)
  password: string
}
