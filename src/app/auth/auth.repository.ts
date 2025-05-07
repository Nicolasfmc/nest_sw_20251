import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './dto/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtTokens } from '../entities/tokens.entity';
import { SaveTokenReq, TokenStatus } from 'src/interfaces';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(JwtTokens)
    private readonly jwtTokensRepo: Repository<JwtTokens>,
  ) {}

  public async getUserLogin(username: string, senha: string): Promise<Users> {
    const query = `SELECT * FROM PK_USERS WHERE username = '${username}' AND senha = '${senha}' AND IND_INATIVO = 0`;

    return await this.entityManager.query(query);
  }

  async saveToken({
    token,
    type,
    user,
    validDate,
  }: SaveTokenReq) {
    const tokenEntity = this.jwtTokensRepo.create({
      token,
      type,
      user,
      validDate,
      isInvalid: TokenStatus.VALIDO,
    });

    return this.jwtTokensRepo.save(tokenEntity);
  }

  async invalidateToken(token: string) {
    return this.jwtTokensRepo.update({ token }, { isInvalid: 1 });
  }

  async isTokenInvalid(token: string): Promise<boolean> {
    const record = await this.jwtTokensRepo.findOne({ where: { token } });
    return record ? record.isInvalid === 1 : false;
  }
}
