import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Users } from './dto/users.entity';

@Injectable()
export class AuthRepository {
  constructor(private readonly entityManager: EntityManager) {}

  public async getUserLogin(username: string, senha: string): Promise<Users> {
    const query = `SELECT * FROM PK_USERS WHERE username = '${username}' AND senha = '${senha}' AND IND_INATIVO = 0`;

    return await this.entityManager.query(query);
  }
}
