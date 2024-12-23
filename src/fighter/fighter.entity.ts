import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { Fight } from './../fight/fight.entity';
import { Ranking } from './../ranking/ranking.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Fighter {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname: string;

  @Field()
  @Column()
  weight_class: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  team: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nationality: string;

  @Field()
  @Column({ default: 0 })
  wins: number;

  @Field()
  @Column({ default: 0 })
  losses: number;

  @Field()
  @Column({ default: 0 })
  knockouts: number;

  @Field()
  @Column({ default: 0 })
  submissions: number;

  @Field(() => [Fight])
  @OneToMany(() => Fight, (fight) => fight.fighter1)
  fightsAsFighter1: Fight[];

  @Field(() => [Fight])
  @OneToMany(() => Fight, (fight) => fight.fighter2)
  fightsAsFighter2: Fight[];

  @Field(() => [Ranking])
  @OneToMany(() => Ranking, (ranking) => ranking.fighter)
  rankings: Ranking[];
}
