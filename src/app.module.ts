import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FighterModule } from './fighter/fighter.module';
import { FightModule } from './fight/fight.module';
import { EventModule } from './event/event.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrationsRun: true,
      autoLoadEntities: true,
      migrations: [__dirname + 'src/database/migrations/*{.ts,.js}'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: [process.cwd().replace(',', ''), 'src/schema.gql'].join(),
      playground: true,
    }),
    FighterModule,
    FightModule,
    EventModule,
    RankingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
