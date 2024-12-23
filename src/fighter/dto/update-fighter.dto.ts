import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateFighterDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nickname?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  weight_class?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  team?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nationality?: string;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  wins?: number;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  losses?: number;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  knockouts?: number;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  submissions?: number;
}
