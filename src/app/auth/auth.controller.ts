import { Controller, Body, Post, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from '../dto/get-user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { LoginRes } from 'src/interfaces';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: GetUserLoginDto): Promise<LoginRes> {
    return await this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não encontrado no header');
    }

    const token = authHeader.replace('Bearer ', '').trim();
    await this.authService.logout(token);

    return { message: 'Logout realizado com sucesso' };
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    if (!token) throw new BadRequestException('Refresh token não enviado');
    return this.authService.refreshToken(token);
  }
}
