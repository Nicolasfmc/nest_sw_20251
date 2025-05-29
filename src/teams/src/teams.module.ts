import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDatabaseService } from 'src/app/generics/database/postgres-database';
import { PostgresService } from 'src/app/generics/database/postgres-service';
import { Teams } from './entities/teams.entity';
import { TeamsControllerRMQ } from './teams.controller.rmq';
import { TeamsRepository } from './teams.repository';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return new PostgresDatabaseService(
          'TEAMS',
          config,
        ).getDefaultConnection();
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Teams]),
  ],
  controllers: [TeamsControllerRMQ],
  providers: [
    TeamsRepository,
    TeamsService,
    {
      provide: 'CLIENT_IDENTIFIER',
      useValue: 'TEAMS',
    },
    PostgresService,
  ],
})
export class TeamsModule {}