import { Injectable } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { Teams } from './entities/teams.entity';
import { StatusResponse } from 'src/user/src/interfaces';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  healthCheck(): StatusResponse {
    return { status: 'OK' };
  }

  async getTeam(idOwner: number): Promise<Teams[]> {
    return await this.teamsRepository.getTeam(idOwner);
  }
}
