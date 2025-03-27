import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserLoginDto } from '../dto/get-user-login.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login({ username, senha }: GetUserLoginDto) {
    const user = await this.validateUser(username, senha);

    if (user) {
      const payload = { username };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
  }

  async validateUser(username: string, senha: string): Promise<any> {
    const result = await this.authRepository.getUserLogin(username, senha);

    if (Array.isArray(result) && result.length < 1) {
      throw new NotFoundException('Usuário e/ou senha incorretos!');
    }

    return result;
  }
}
