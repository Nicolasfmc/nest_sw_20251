import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserControllerRMQ } from './user.controller.rmq';  // Para receber as mensagens
import { UserService } from './user.service';               // Service de negócio
import { UserRepository } from './user.repository';         // Repositório

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'user_queue',
        },
      },
    ]),
  ],
  controllers: [UserControllerRMQ],  // Controller para consumir as mensagens
  providers: [UserService, UserRepository],
})
export class MicroserviceModule {}
