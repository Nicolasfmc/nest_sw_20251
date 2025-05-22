import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { Teams } from './entities/teams.entity';
import { AppRepository } from './app.repository';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users, Teams]),
    AuthModule,
    MicroserviceModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
  exports: [AppRepository],
})
export class AppModule {}
