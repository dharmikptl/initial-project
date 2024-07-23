import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity({ name: 'RefreshTokens' })
export class RefreshToken extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    unique: true
  })
  token: string

  @Field()
  @Column()
  userId: string

  @Field()
  @Column({
    length: 2047
  })
  userAgent: string

  @Field()
  @Column({
    default: true
  })
  isActive: boolean

  @Field()
  @CreateDateColumn({
    type: 'timestamp with time zone'
  })
  createdAt: Date

  @Field()
  @UpdateDateColumn({
    type: 'timestamp with time zone'
  })
  updatedAt: Date
}
