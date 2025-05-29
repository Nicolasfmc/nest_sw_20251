import { Injectable } from '@nestjs/common';
import { Inject, Logger } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { StatusResponse } from 'src/user/src/interfaces';
import { Teams } from 'src/teams/src/entities/teams.entity';

@Injectable()
export class TeamsHandler {
  constructor(
    @Inject('TEAMS_SERVICE_RMQ')
    private clientTeamsRMQ: ClientRMQ,
  ) {}

  private readonly logger = new Logger(TeamsHandler.name);

  public getStatus(): Observable<StatusResponse> {
    return this.clientTeamsRMQ.send({ cmd: 'Teams.HealthCheck' }, {});
  }

  getTeam(idOwner: number): Observable<Teams[]> {
    this.logger.log(`Sent message to queue: get_teams with ID ${idOwner}`);

    return this.clientTeamsRMQ.send({ cmd: 'Teams.GetTeam' }, { idOwner });
  }
}
