import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class PostgresDatabaseService {
  constructor(
    public serviceName: string,
    private configService?: ConfigService,
  ) {}

  public getDefaultConnection(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get(`${this.serviceName}_DB_HOST`),
      port: +this.configService.get<number>(`${this.serviceName}_DB_PORT`),
      username: this.configService.get(`${this.serviceName}_DB_USERNAME`),
      password: this.configService.get(`${this.serviceName}_DB_PASSWORD`),
      database: this.configService.get(`${this.serviceName}_DB_NAME`),
      synchronize: false,
      autoLoadEntities: true,
      extra: {
        max: 20,           // Máximo de conexões no pool
        idleTimeoutMillis: 10000, // Tempo para fechar conexões ociosas
        connectionTimeoutMillis: 30000, // Timeout de tentativa de conexão
      },
    };
  }

  public getHeavyLoadConnection(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get(`${this.serviceName}_DB_HOST`),
      port: +this.configService.get<number>(`${this.serviceName}_DB_PORT`),
      username: this.configService.get(`${this.serviceName}_DB_USERNAME`),
      password: this.configService.get(`${this.serviceName}_DB_PASSWORD`),
      database: this.configService.get(`${this.serviceName}_DB_NAME`),
      synchronize: false,
      autoLoadEntities: true,
      extra: {
        max: 100,           // Para cargas mais pesadas
        idleTimeoutMillis: 5000,
        connectionTimeoutMillis: 60000,
      },
    };
  }

  public getLightweightConnection(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get(`${this.serviceName}_DB_HOST`),
      port: +this.configService.get<number>(`${this.serviceName}_DB_PORT`),
      username: this.configService.get(`${this.serviceName}_DB_USERNAME`),
      password: this.configService.get(`${this.serviceName}_DB_PASSWORD`),
      database: this.configService.get(`${this.serviceName}_DB_NAME`),
      synchronize: false,
      autoLoadEntities: true,
      extra: {
        max: 10,
        idleTimeoutMillis: 15000,
        connectionTimeoutMillis: 15000,
      },
    };
  }
}
