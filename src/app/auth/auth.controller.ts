import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserLoginDto } from '../dto/get-user-login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: GetUserLoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(dto);
  }
}
