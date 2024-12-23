import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFighterDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nickname?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  weight_class: string;

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
  wins?: number = 0;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  losses?: number = 0;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  knockouts?: number = 0;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  submissions?: number = 0;
}
