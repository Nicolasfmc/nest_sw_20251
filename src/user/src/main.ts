import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { RmqService } from 'src/app/src/generics/rmq/rmq-service';

async function main(): Promise<void> {
  const app = await NestFactory.create(UserModule);
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