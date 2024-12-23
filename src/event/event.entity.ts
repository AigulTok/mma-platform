import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Fight } from './../fight/fight.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Event {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Date)
  @Column()
  date: Date;

  @Field(() => [Fight], { nullable: true })
  @OneToMany(() => Fight, (fight) => fight.event, { nullable: true })
  fights: Fight[];
}
