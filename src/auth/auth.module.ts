import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthRepository } from './auth.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './dto/users.entity';
import { JwtTokens } from '../app/entities/tokens.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '15m',
          algorithm: 'RS256'
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users, JwtTokens]),
    PassportModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})

export class AuthModule {}
