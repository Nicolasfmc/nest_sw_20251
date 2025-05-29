import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'verbose', 'debug', 'log'],
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://poke-consulting.vercel.app',
      '*',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Documentação da API do NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('nest-sw-20251')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

main();
