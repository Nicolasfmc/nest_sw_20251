import { Injectable } from '@nestjs/common';
import { Inject, Logger } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { StatusResponse } from 'src/user/src/interfaces';
import { Users } from 'src/user/src/entities/users.entity';

@Injectable()
export class UserHandler {
  constructor(
    @Inject('USER_SERVICE_RMQ')
    private clientUserRMQ: ClientRMQ,
  ) {}

  private readonly logger = new Logger(UserHandler.name);

  public getStatus(): Observable<StatusResponse> {
    return this.clientUserRMQ.send({ cmd: 'User.HealthCheck' }, {});
  }

  async getUser(id: number): Observable<Users> {
    this.logger.log(`Sent message to queue: get_user with ID ${id}`);

    return this.clientUserRMQ.send({ cmd: 'User.GetUser' }, { id });
  }
}
