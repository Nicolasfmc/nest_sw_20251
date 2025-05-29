import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserHandler } from './user.handler';
import { Observable } from 'rxjs';
import { Users } from 'src/user/src/entities/users.entity';
import { StatusResponse } from 'src/user/src/interfaces';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUserDto } from '../dto/get-user.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userHandler: UserHandler) {}

  @ApiOperation({ summary: 'Verifica saúde da aplicação' })
  @Get()
  getStatus(): Observable<StatusResponse> {
    return this.userHandler.getStatus();
  }

  @ApiOperation({ summary: 'Busca um usuário' })
  @Get('get-user')
  @UseGuards(JwtAuthGuard)
  getUser(@Query() data: GetUserDto): Observable<Users> {
    return this.userHandler.getUser(data.id);
  }

  // @ApiOperation({ summary: 'Busca todos os usuários. *ADMIN only*' })
  // @Get('/user/get-all')
  // @UseGuards(JwtAuthGuard)
  // getAllUsers(): Observable<Users[]> {
  //   return this.appService.getAllUsers();
  // }

  // @ApiOperation({ summary: 'Realiza login de um usuário.' })
  // @Get('/user/get-user-login')
  // @UseGuards(JwtAuthGuard)
  // getUserLogin(@Query() data: GetUserLoginDto): Observable<Users> {
  //   return this.appService.getUserLogin(data.username, data.senha);
  // }

  // @ApiOperation({ summary: 'Cadastra um usuário.' })
  // @Put('/user/register-user')
  // @UseGuards(JwtAuthGuard)
  // registerUser(@Body() data: RegisterUserDto): Observable<RegisterUserRes> {
  //   return this.appService.registerUser(data);
  // }

  // @ApiOperation({ summary: 'Atualiza um usuário.' })
  // @Patch('/user/update-user')
  // @UseGuards(JwtAuthGuard)
  // updateUser(@Body() data: UpdateUserDto): Observable<StatusResponse> {
  //   return this.appService.updateUser(data);
  // }

  // @ApiOperation({ summary: 'Deleta um usuário.' })
  // @Delete('/user/delete-user')
  // @UseGuards(JwtAuthGuard)
  // deleteUser(@Query() data: DeleteUserDto): Observable<StatusResponse> {
  //   return this.appService.deleteUser(data.id);
  // }
}
