import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeamsService } from './teams.service';
import { StatusResponse } from 'src/user/src/interfaces';
import { Teams } from './entities/teams.entity';

@Controller()
export class TeamsControllerRMQ {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern({ cmd: 'Teams.HealthCheck' })
  getStatus(): StatusResponse {
    return this.teamsService.healthCheck();
  }

  @MessagePattern({ cmd: 'Teams.GetTeam' })
  async getTeam(@Payload() data: { idOwner: number }): Promise<Teams[]> {
    return await this.teamsService.getTeam(data.idOwner);
  }
}
