import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Fighter } from './../fighter/fighter.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Ranking {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  weight_class: string;

  @Field(() => Fighter, { nullable: true })
  @ManyToOne(() => Fighter, (fighter) => fighter.rankings, { nullable: true })
  fighter: Fighter;

  @Field()
  @Column()
  rank: number;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
