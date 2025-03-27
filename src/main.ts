import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://poke-consulting.vercel.app', // frontend
      '*',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Documentação da API do NestJS')
    .setVersion('1.0')
    .addTag('nest-sw-20251')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(5432);
}

main();
