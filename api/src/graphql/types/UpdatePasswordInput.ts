import { Length, Matches } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdatePasswordInput {
  @Field()
  @Length(1, 255)
  currentPassword: string

  @Field()
  @Length(8, 20)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message: 'password too weak'
  })
  newPassword: string
}
