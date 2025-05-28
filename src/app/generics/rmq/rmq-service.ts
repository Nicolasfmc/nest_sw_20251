import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(
    public serviceName: string,
    private configService?: ConfigService,
  ) {}

  public getConnectionRmq(): ClientOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          {
            vhost: '/',
            protocol: 'amqp',
            hostname: this.configService.get('HOST_RMQ'),
            port: parseInt(this.configService.get('PORT_RMQ')),
            frameMax: 10485760, // Limite de 10 MB por frame
            heartbeat: 0,
            locale: 'pt_BR',
            username: this.configService.get('USERNAME_RMQ'),
            password: this.configService.get('PASSWORD_RMQ'),
          },
        ],
        queue: this.configService.get(this.serviceName + '_QUEUE'),
        queueOptions: {
          durable: false,
        },
        socketOptions: {
          timeout: 60,
          noDelay: false,
          keepAlive: true,
        },
      },
    };
  }
}
