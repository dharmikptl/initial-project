import { Field, ID, ObjectType, Root } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity({ name: 'Users' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string

  @Field()
  @Column()
  role: string

  @Field()
  @Column({
    default: true
  })
  isActive: boolean

  @Column({
    type: 'varchar',
    length: 2047,
    nullable: true
  })
  googleId?: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Field()
  @Column()
  gender: string

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    length: 2047,
    nullable: true
  })
  profileImage?: string

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
