import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from './fighter.entity';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepository: Repository<Fighter>,
  ) {}

  async findAll(): Promise<Fighter[]> {
    return this.fighterRepository.find();
  }

  async findOne(id: string): Promise<Fighter> {
    const fighter = await this.fighterRepository.findOne({ where: { id } });
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    return fighter;
  }

  async getFighterStatistics(id: string): Promise<Partial<Fighter>> {
    const fighter = await this.fighterRepository.findOne({
      where: { id },
      relations: ['rankings', 'rankings.fighter'],
    });
    if (!fighter) {
      throw new NotFoundException(`Fighter with ID ${id} not found`);
    }
    return {
      id: fighter.id,
      name: fighter.name,
      weight_class: fighter.weight_class,
      wins: fighter.wins,
      losses: fighter.losses,
      knockouts: fighter.knockouts,
      submissions: fighter.submissions,
      rankings: fighter.rankings.map((ranking) => ({
        id: ranking.id,
        rank: ranking.rank,
        weight_class: ranking.weight_class,
        updated_at: ranking.updated_at,
        fighter: ranking.fighter,
      })),
    };
  }

  async create(createFighterDto: CreateFighterDto): Promise<Fighter> {
    if (!createFighterDto.name || !createFighterDto.weight_class) {
      throw new BadRequestException(
        'Fighter name and weight class are required',
      );
    }
    const fighter = this.fighterRepository.create(createFighterDto);
    return this.fighterRepository.save(fighter);
  }

  async update(
    id: string,
    updateFighterDto: UpdateFighterDto,
  ): Promise<Fighter> {
    const fighter = await this.findOne(id);
    Object.assign(fighter, updateFighterDto);
    return this.fighterRepository.save(fighter);
  }

  async remove(id: string): Promise<boolean> {
    const fighter = await this.findOne(id);
    await this.fighterRepository.delete(fighter.id);
    return true;
  }
}
