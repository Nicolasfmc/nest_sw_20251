import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { TeamsModule } from './teams.module';
import { RmqService } from 'src/app/generics/rmq/rmq-service';

async function main(): Promise<void> {
  const app = await NestFactory.create(TeamsModule);
  const configurationService = app.get(ConfigService);
  const optionsRmq = new RmqService(
    'USER',
    configurationService,
  ).getConnectionRmq();
  app.connectMicroservice<MicroserviceOptions>(optionsRmq);
  app.startAllMicroservices();
  await app.init();
}

main();