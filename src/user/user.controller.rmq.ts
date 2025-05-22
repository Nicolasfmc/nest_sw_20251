import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserControllerRMQ {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user') // Esta mensagem será recebida pela fila 'user_queue'
  async getUser(@Payload() id: number) {
    const user = await this.userService.getUser(id);
    return user;
  }
}
