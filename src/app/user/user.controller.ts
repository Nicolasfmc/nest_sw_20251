import { Controller, Get, Query } from '@nestjs/common';
import { UserHandler } from './user.handler';

@Controller('user')
export class UserController {
  constructor(private readonly userHandler: UserHandler) {}

  @Get('get-user')
  async getUser(@Query('id') id: string) {
    await this.userHandler.handleUserRequest(id);
    return { message: 'Request sent to queue' };
  }
}
