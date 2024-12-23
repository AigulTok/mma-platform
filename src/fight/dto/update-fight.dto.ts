import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

@InputType()
export class UpdateFightDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fighter1Id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fighter2Id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  eventId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  winnerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  method?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  rounds?: number;
}
