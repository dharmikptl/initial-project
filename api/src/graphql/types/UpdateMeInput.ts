import { IsIn, IsOptional, Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UpdateMeInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(1, 255)
  firstName: string | undefined

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(1, 255)
  lastName: string | undefined

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender: string | undefined

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(1, 2047)
  profileImage: string | undefined
}
