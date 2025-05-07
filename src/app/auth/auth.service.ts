import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserLoginDto } from '../dto/get-user-login.dto';
import { AuthRepository } from './auth.repository';
import { Users } from '../entities/users.entity';
import { GenerateTokensReq, LoginRes, TokenType } from 'src/interfaces';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, senha }: GetUserLoginDto): Promise<LoginRes> {
    const user = await this.validateUser(username, senha);

    if (user) {
      const payload: GenerateTokensReq = { username: user.username, sub: user.id }
      
      return await this.generateTokens(payload);
    }
  }

  async logout(token: string) {
    await this.authRepository.invalidateToken(token);
  }
  
  async isTokenInvalid(token: string): Promise<boolean> {
    return this.authRepository.isTokenInvalid(token);
  }

  async validateUser(username: string, senha: string): Promise<Users> {
    const result = await this.authRepository.getUserLogin(username, senha);

    if (Array.isArray(result) && result.length < 1) {
      throw new NotFoundException('Usuário e/ou senha incorretos!');
    }

    return result;
  }

  async generateTokens(payload: GenerateTokensReq) {
  
    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  
    const refreshToken: string = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  
    const now = new Date();
    const accessExp = new Date(now.getTime() + 15 * 60 * 1000); // 15 min
    const refreshExp = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias
  
    await this.authRepository.saveToken({
      token: accessToken,
      type: TokenType.ACCESS,
      user: payload.username,
      validDate: accessExp,
    });

    await this.authRepository.saveToken({
      token: refreshToken,
      type: TokenType.REFRESH,
      user: payload.username,
      validDate: refreshExp,
    });
  
    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const isInvalid = await this.isTokenInvalid(token);
    if (isInvalid) throw new UnauthorizedException('Token inválido');
  
    try {
      const payload = this.jwtService.verify(token);
  
      // Invalida o refresh token atual (rotação)
      await this.logout(token);
  
      // Gera novos tokens
      return this.generateTokens(payload);
    } catch (err) {
      throw new UnauthorizedException('Refresh token expirado ou inválido');
    }
  }
}
