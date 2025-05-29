import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDatabaseService } from 'src/app/src/generics/database/postgres-database';
import { PostgresService } from 'src/app/src/generics/database/postgres-service';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserControllerRMQ } from './user.controller.rmq';
import { Users } from './entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return new PostgresDatabaseService(
          'USER',
          config,
        ).getDefaultConnection();
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [UserControllerRMQ],
  providers: [
    UserRepository,
    UserService,
    {
      provide: 'CLIENT_IDENTIFIER',
      useValue: 'USER',
    },
    PostgresService,
  ],
})
export class UserModule {}