import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { StatusResponse } from 'src/user/src/interfaces';
import { Users } from './entities/users.entity';

@Controller()
export class UserControllerRMQ {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'User.HealthCheck' })
  getStatus(): StatusResponse {
    return this.userService.healthCheck();
  }

  @MessagePattern({ cmd: 'User.GetUser' })
  async getUser(@Payload() data: { id: number }): Promise<Users> {
    const user = await this.userService.getUser(data.id);
    return user;
  }
}
