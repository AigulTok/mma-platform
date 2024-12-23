import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from './ranking.entity';
import { Fighter } from '../fighter/fighter.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking) private rankingRepository: Repository<Ranking>,
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
  ) {}

  async findByWeightClass(weightClass: string): Promise<Ranking[]> {
    return this.rankingRepository.find({
      where: { weight_class: weightClass },
      relations: ['fighter'],
    });
  }

  async updateRankings(weight_class: string): Promise<Ranking[]> {
    const fighters = await this.fighterRepository.find({
      where: { weight_class },
    });

    const sortedFighters = fighters.sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (a.losses !== b.losses) return a.losses - b.losses;
      return b.knockouts - a.knockouts;
    });

    const updatedRankings: Ranking[] = [];
    for (let i = 0; i < sortedFighters.length; i++) {
      const fighter = sortedFighters[i];
      let ranking = await this.rankingRepository.findOne({
        where: { fighter, weight_class },
      });

      if (!ranking) {
        ranking = this.rankingRepository.create({
          fighter,
          weight_class,
          rank: i + 1,
        });
      } else {
        ranking.rank = i + 1;
        ranking.updated_at = new Date();
      }

      const savedRanking = await this.rankingRepository.save(ranking);
      updatedRankings.push(savedRanking);
    }

    return updatedRankings;
  }
}
