import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RankingService } from './ranking.service';
import { Ranking } from './ranking.entity';

@Resolver(() => Ranking)
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}

  @Query(() => [Ranking])
  async getRankings(
    @Args('weightClass') weightClass: string,
  ): Promise<Ranking[]> {
    return this.rankingService.findByWeightClass(weightClass);
  }

  @Mutation(() => [Ranking])
  async updateRankings(
    @Args('weight_class') weight_class: string,
  ): Promise<Ranking[]> {
    return this.rankingService.updateRankings(weight_class);
  }
}
