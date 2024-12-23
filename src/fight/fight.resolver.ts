import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FightService } from './fight.service';
import { Fight } from './fight.entity';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly fightService: FightService) {}

  @Query(() => [Fight])
  async getAllFights(): Promise<Fight[]> {
    return this.fightService.findAll();
  }

  @Query(() => Fight)
  async getFight(@Args('id') id: string): Promise<Fight> {
    return this.fightService.findOne(id);
  }

  @Query(() => [Fight])
  async getFighterFightHistory(
    @Args('fighterId') fighterId: string,
  ): Promise<Fight[]> {
    return this.fightService.getFightHistory(fighterId);
  }

  @Mutation(() => Fight)
  async createFight(
    @Args('createFightDto') createFightDto: CreateFightDto,
  ): Promise<Fight> {
    return this.fightService.create(createFightDto);
  }

  @Mutation(() => Fight)
  async updateFight(
    @Args('id') id: string,
    @Args('updateFightDto') updateFightDto: UpdateFightDto,
  ): Promise<Fight> {
    return this.fightService.update(id, updateFightDto);
  }

  @Mutation(() => Boolean)
  async deleteFight(@Args('id') id: string): Promise<boolean> {
    return this.fightService.remove(id);
  }
}
