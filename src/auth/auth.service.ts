import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserLoginDto } from '../app/dto/get-user-login.dto';
import { AuthRepository } from './auth.repository';
import { Users } from '../user/src/entities/users.entity';
import { LoginRes, TokenType } from 'src/user/src/interfaces';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, senha, accessToken, refreshToken }: GetUserLoginDto): Promise<LoginRes> {
    const [user, isAccessValid, isRefreshValid] = await Promise.all([
      this.validateUser(username, senha),
      this.isTokenInvalid(accessToken),
      this.isTokenInvalid(refreshToken),
    ]);

    if (!isRefreshValid && refreshToken) {
      await this.authRepository.invalidateToken(refreshToken);

      throw new UnauthorizedException('token inválido ou expirado');
    }

    if (!isAccessValid && refreshToken) {
      await this.authRepository.invalidateToken(accessToken);
    }

    if (user) {
      const payload = { username: user.username, sub: user.id }

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

    return result[0];
  }

  async generateTokens(payload) {
    const { exp, iat, ...cleanPayload } = payload;
  
    const accessToken: string = this.jwtService.sign(cleanPayload, {
      expiresIn: '1m',
    });
  
    const refreshToken: string = this.jwtService.sign(cleanPayload, {
      expiresIn: '7d',
    });
  
    const now = new Date();
    const accessExp = new Date(now.getTime() + 1 * 60 * 1000); // 1 min
    const refreshExp = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias
  
    await this.authRepository.saveToken({
      token: accessToken,
      type: TokenType.ACCESS,
      username: cleanPayload.username,
      validDate: accessExp,
    });

    await this.authRepository.saveToken({
      token: refreshToken,
      type: TokenType.REFRESH,
      username: cleanPayload.username,
      validDate: refreshExp,
    });
  
    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    const isInvalid = await this.isTokenInvalid(token);
    if (isInvalid) throw new UnauthorizedException('Token inválido ou expirado');
  
    try {
      const payload = this.jwtService.verify(token);
  
      // Invalida o refresh token atual (rotação)
      await this.authRepository.invalidateAllTokens(payload.username);
  
      // Gera novos tokens
      return await this.generateTokens(payload);
    } catch (err) {
      throw new UnauthorizedException('Refresh token expirado ou inválido');
    }
  }
}
