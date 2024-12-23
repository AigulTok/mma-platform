import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FighterService } from './fighter.service';
import { Fighter } from './fighter.entity';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';

@Resolver(() => Fighter)
export class FighterResolver {
  constructor(private readonly fighterService: FighterService) {}

  @Query(() => [Fighter])
  async getAllFighters(): Promise<Fighter[]> {
    return this.fighterService.findAll();
  }

  @Query(() => Fighter)
  async getFighter(@Args('id') id: string): Promise<Fighter> {
    return this.fighterService.findOne(id);
  }

  @Query(() => Fighter)
  async fighterStatistics(@Args('id') id: string): Promise<Partial<Fighter>> {
    return this.fighterService.getFighterStatistics(id);
  }

  @Mutation(() => Fighter)
  async createFighter(
    @Args('createFighterDto') createFighterDto: CreateFighterDto,
  ): Promise<Fighter> {
    return this.fighterService.create(createFighterDto);
  }

  @Mutation(() => Fighter)
  async updateFighter(
    @Args('id') id: string,
    @Args('updateFighterDto') updateFighterDto: UpdateFighterDto,
  ): Promise<Fighter> {
    return this.fighterService.update(id, updateFighterDto);
  }

  @Mutation(() => Boolean)
  async deleteFighter(@Args('id') id: string): Promise<boolean> {
    return this.fighterService.remove(id);
  }
}
