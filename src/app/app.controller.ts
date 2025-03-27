import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Users } from './entities/users.entity';
import { GetUserDto } from './dto/get-user.dto';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { RegisterUserRes, StatusResponse } from 'src/interfaces';
import { RegisterUserDto } from './dto/register-user.dto';
import { GetTeamDto } from './dto/get-team.dto';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from './dto/save-team.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { DeleteTeamDto } from './dto/delete-team.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
@ApiTags('App')
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Verifica saúde da aplicação.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Busca um usuário.' })
  @Get('/user/get-user')
  @UseGuards(JwtAuthGuard)
  getUser(@Query() data: GetUserDto): Promise<Users> {
    return this.appService.getUser(data.id);
  }

  @ApiOperation({ summary: 'Busca todos os usuários. *ADMIN only*' })
  @Get('/user/get-all')
  @UseGuards(JwtAuthGuard)
  getAllUsers(): Promise<Users[]> {
    return this.appService.getAllUsers();
  }

  @ApiOperation({ summary: 'Realiza login de um usuário.' })
  @Get('/user/get-user-login')
  @UseGuards(JwtAuthGuard)
  getUserLogin(@Query() data: GetUserLoginDto): Promise<Users> {
    return this.appService.getUserLogin(data.username, data.senha);
  }

  @ApiOperation({ summary: 'Cadastra um usuário.' })
  @Put('/user/register-user')
  @UseGuards(JwtAuthGuard)
  registerUser(@Body() data: RegisterUserDto): Promise<RegisterUserRes> {
    return this.appService.registerUser(data);
  }

  @ApiOperation({ summary: 'Atualiza um usuário.' })
  @Patch('/user/update-user')
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() data: UpdateUserDto): Promise<StatusResponse> {
    return this.appService.updateUser(data);
  }

  @ApiOperation({ summary: 'Deleta um usuário.' })
  @Delete('/user/delete-user')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Query() data: DeleteUserDto): Promise<StatusResponse> {
    return this.appService.deleteUser(data.id);
  }

  /**
   * teams
   */
  @ApiOperation({ summary: 'Busca o time de pokémon conforme o id do dono.' })
  @Get('/team/get-team')
  @UseGuards(JwtAuthGuard)
  getTeam(@Query() data: GetTeamDto): Promise<Teams[]> {
    return this.appService.getTeam(data.idOwner);
  }

  @ApiOperation({ summary: 'Salva o time de pokémon. Utilizado pra criar ou atualizar.' })
  @Post('/team/save-team')
  @UseGuards(JwtAuthGuard)
  saveTeam(@Body() data: SaveTeamDto[]): Promise<StatusResponse> {
    return this.appService.saveTeam(data);
  }

  @ApiOperation({ summary: 'Deleta o time de pokémon conforme o id do dono.' })
  @Delete('/team/delete-team')
  @UseGuards(JwtAuthGuard)
  deleteTeam(@Query() data: DeleteTeamDto): Promise<StatusResponse> {
    return this.appService.deleteTeam(data.idOwner);
  }
}
