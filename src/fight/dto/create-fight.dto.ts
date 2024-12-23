import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateFightDto {
  @Field()
  @IsString()
  fighter1Id: string;

  @Field()
  @IsString()
  fighter2Id: string;

  @Field()
  @IsString()
  eventId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  result?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fightType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fightDate?: string;

  @Field()
  @IsString()
  weight_class: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  method?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  winnerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  rounds?: number;
}
