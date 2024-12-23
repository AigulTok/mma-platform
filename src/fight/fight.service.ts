import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './fight.entity';
import { Fighter } from '../fighter/fighter.entity';
import { Event } from '../event/event.entity';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Fight[]> {
    return this.fightRepository.find({
      relations: ['fighter1', 'fighter2', 'winner', 'event'],
    });
  }

  async findOne(id: string): Promise<Fight> {
    const fight = await this.fightRepository.findOne({
      where: { id },
      relations: ['fighter1', 'fighter2', 'winner', 'event'],
    });
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    return fight;
  }

  async getFightHistory(fighterId: string): Promise<Fight[]> {
    const fight = await this.fightRepository.find({
      where: [{ fighter1: { id: fighterId } }, { fighter2: { id: fighterId } }],
      relations: ['fighter1', 'fighter2', 'winner', 'event'],
    });
    if (!fight) {
      throw new NotFoundException(
        `Fight with fighterId ${fighterId} not found`,
      );
    }
    return fight;
  }

  async create(createFightDto: CreateFightDto): Promise<Fight> {
    const fighter1 = await this.fighterRepository.findOne({
      where: { id: createFightDto.fighter1Id },
    });
    const fighter2 = await this.fighterRepository.findOne({
      where: { id: createFightDto.fighter2Id },
    });
    const event = await this.eventRepository.findOne({
      where: { id: createFightDto.eventId },
    });

    if (!fighter1 || !fighter2 || !event) {
      throw new NotFoundException('Fighter or Event not found');
    }

    const fight = this.fightRepository.create({
      ...createFightDto,
      fighter1,
      fighter2,
      event,
    });
    return this.fightRepository.save(fight);
  }

  async update(id: string, updateFightDto: UpdateFightDto): Promise<Fight> {
    const fight = await this.fightRepository.findOne({
      where: { id },
      relations: ['fighter1', 'fighter2'],
    });
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    const winner = await this.fighterRepository.findOne({
      where: { id: updateFightDto.winnerId },
    });
    if (!winner) {
      throw new NotFoundException('Winner not found');
    }

    fight.winner = winner;
    winner.wins += 1;

    if (updateFightDto.method === 'Knockout') winner.knockouts += 1;
    if (updateFightDto.method === 'Submission') winner.submissions += 1;
    await this.fighterRepository.save(winner);

    const loser =
      fight.fighter1.id === winner.id ? fight.fighter2 : fight.fighter1;
    loser.losses += 1;
    await this.fighterRepository.save(loser);

    return this.fightRepository.save(fight);
  }

  async remove(id: string): Promise<boolean> {
    const fight = await this.findOne(id);
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    await this.fightRepository.delete(fight.id);
    return true;
  }
}
