import { Injectable } from '@nestjs/common';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserHandler {
  private readonly logger = new Logger(UserHandler.name);

  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async handleUserRequest(id: string) {
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }

    await this.client.emit('get_user', userId);
    this.logger.log(`Sent message to queue: get_user with ID ${userId}`);
  }
}
