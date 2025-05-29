import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusResponse } from 'src/user/src/interfaces';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetTeamDto } from '../dto/get-team.dto';
import { SaveTeamDto } from '../dto/save-team.dto';
import { DeleteTeamDto } from '../dto/delete-team.dto';
import { TeamsHandler } from './teams.handler';
import { Teams } from 'src/teams/src/entities/teams.entity';

@Controller('team')
@ApiTags('Teams')
@ApiBearerAuth()
export class TeamsController {
  constructor(private readonly teamsHandler: TeamsHandler) {}

  @ApiOperation({ summary: 'Verifica saúde da aplicação.' })
  @Get()
  getStatus(): string {
    return this.teamsHandler.getStatus();
  }

  @ApiOperation({ summary: 'Busca o time de pokémon conforme o id do dono.' })
  @Get('get-team')
  @UseGuards(JwtAuthGuard)
  getTeam(@Query() data: GetTeamDto): Promise<Teams[]> {
    return this.teamsHandler.getTeam(data.idOwner);
  }

//   @ApiOperation({ summary: 'Salva o time de pokémon. Utilizado pra criar ou atualizar.' })
//   @Post('save-team')
//   @UseGuards(JwtAuthGuard)
//   saveTeam(@Body() data: SaveTeamDto[]): Promise<StatusResponse> {
//     return this.teamsHandler.saveTeam(data);
//   }

//   @ApiOperation({ summary: 'Deleta o time de pokémon conforme o id do dono.' })
//   @Delete('delete-team')
//   @UseGuards(JwtAuthGuard)
//   deleteTeam(@Query() data: DeleteTeamDto): Promise<StatusResponse> {
//     return this.teamsHandler.deleteTeam(data.idOwner);
//   }
}
