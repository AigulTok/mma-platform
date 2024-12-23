import { Module } from '@nestjs/common';
import { FighterService } from './fighter.service';
import { FighterResolver } from './fighter.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './fighter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FighterService, FighterResolver],
})
export class FighterModule {}
