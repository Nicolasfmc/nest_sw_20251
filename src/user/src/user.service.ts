import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Users } from './entities/users.entity';
import { StatusResponse } from 'src/user/src/interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  healthCheck(): StatusResponse {
    return { status: 'OK' };
  }

  async getUser(id: number): Promise<Users> {
    return await this.userRepository.getUser(id);
  }
}
