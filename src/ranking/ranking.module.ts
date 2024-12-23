import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingResolver } from './ranking.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './ranking.entity';
import { Fighter } from 'src/fighter/fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Fighter])],
  providers: [RankingService, RankingResolver],
})
export class RankingModule {}
