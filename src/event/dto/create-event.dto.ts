import { IsString, IsDateString } from 'class-validator';
import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventDto {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  location: string;

  @Field(() => GraphQLISODateTime)
  @IsDateString()
  date: string;
}
