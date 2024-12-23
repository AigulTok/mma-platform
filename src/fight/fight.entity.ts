import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  JoinColumn,
} from 'typeorm';
import { Fighter } from './../fighter/fighter.entity';
import { Event } from './../event/event.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Fight {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Event)
  @ManyToOne(() => Event, (event) => event.fights)
  event: Event;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsFighter1)
  fighter1: Fighter;

  @Field(() => Fighter)
  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsFighter2)
  fighter2: Fighter;

  @Field()
  @Column()
  weight_class: string;

  @Field(() => Fighter, { nullable: true })
  @ManyToOne(() => Fighter, { nullable: true })
  winner: Fighter;

  @Field()
  @Column({ default: 3 })
  rounds: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  method: string;
}
