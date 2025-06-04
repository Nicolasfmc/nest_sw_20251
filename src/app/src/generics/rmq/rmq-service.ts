import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(
    public serviceName: string,
    private configService: ConfigService,
  ) {}

  private getUri(): string {
    const username = this.configService.get<string>('USERNAME_RMQ');
    const password = this.configService.get<string>('PASSWORD_RMQ');
    const host = this.configService.get<string>('HOST_RMQ');
    const port = this.configService.get<string>('PORT_RMQ');
    const vhost = '/';

    return `amqp://${username}:${password}@${host}:${port}${vhost}`;
  }

  public getConnectionRmq(): ClientOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.getUri()],
        queue: this.configService.get<string>(`${this.serviceName}_QUEUE`),
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  public createConnectionRmq(): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.getUri()],
        queue: this.configService.get<string>(`${this.serviceName}_QUEUE`),
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
