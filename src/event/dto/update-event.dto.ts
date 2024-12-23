import { IsString, IsOptional, IsDateString } from 'class-validator';
import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEventDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  @IsDateString()
  date?: string;
}
