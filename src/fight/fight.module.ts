import { Module } from '@nestjs/common';
import { FightService } from './fight.service';
import { FightResolver } from './fight.resolver';
import { Fight } from './fight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from 'src/fighter/fighter.entity';
import { Event } from 'src/event/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight, Fighter, Event])],
  providers: [FightService, FightResolver],
})
export class FightModule {}
