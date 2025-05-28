import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { PostgresDatabaseService } from './generics/database/postgres-database';
import { PostgresService } from './generics/database/postgres-service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return new PostgresDatabaseService(
          'GATEWAY',
          config,
        ).getDefaultConnection();
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
  ],
  providers: [
    {
      provide: 'CLIENT_IDENTIFIER',
      useValue: 'GATEWAY',
    },
    PostgresService,
  ]
})
export class AppModule {}
