import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: number) {
    // Aqui você pode realizar o processamento do usuário e retornar os dados
    return await this.userRepository.findOne(id);
  }
}
