import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Users } from './dto/users.entity';
import { SaveTokenReq, TokenStatus } from 'src/user/src/interfaces';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly entityManager: EntityManager,
  ) {}

  public async getUserLogin(username: string, senha: string): Promise<Users> {
    const query = `SELECT * FROM PK_USERS WHERE username = '${username}' AND senha = '${senha}' AND IND_INATIVO = 0`;

    return await this.entityManager.query(query);
  }

  async saveToken({
    token,
    type,
    username,
    validDate,
  }: SaveTokenReq) {
    return await this.entityManager.query(
      `INSERT INTO JWT_TOKENS (TOKEN, TYPE, USERNAME, VALID_DATE, IS_INVALID)
       VALUES ($1, $2, $3, $4, $5)`,
      [token, type, username, validDate, TokenStatus.VALIDO]
    );    
  }

  async invalidateToken(token: string) {
    return await this.entityManager.query(
      `UPDATE JWT_TOKENS SET IS_INVALID = $1 WHERE TOKEN = $2`,
      [TokenStatus.INVALIDADO, token]
    );
  }

  async invalidateAllTokens(username: string) {
    return await this.entityManager.query(
      `UPDATE JWT_TOKENS SET IS_INVALID = $1 WHERE USERNAME = $2 AND IS_INVALID = $3`,
      [TokenStatus.INVALIDADO, username, TokenStatus.VALIDO]
    );
  }

  async isTokenInvalid(token: string): Promise<boolean> {
    const result = await this.entityManager.query(
      'SELECT IS_INVALID FROM JWT_TOKENS WHERE TOKEN = $1',
      [token]
    );

    if (Array.isArray(result) && result.length > 0) {
      return result[0].is_invalid == TokenStatus.INVALIDADO;
    }

    return false;
  }
}
