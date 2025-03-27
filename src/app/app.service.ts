import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { AppRepository } from './app.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserRes, StatusResponse } from 'src/interfaces';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from './dto/save-team.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly appRepo: AppRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUser(id: number): Promise<Users> {
    return this.appRepo.getUser(id);
  }

  async getAllUsers(): Promise<Users[]> {
    return this.appRepo.getAllUsers();
  }

  async getUserLogin(username: string, senha: string): Promise<Users> {
    const result = await this.appRepo.getUserLogin(username, senha);

    if (Array.isArray(result) && result.length < 1) {
      throw new NotFoundException('Usuário e/ou senha não encontrados!');
    }

    return result;
  }

  async registerUser(data: RegisterUserDto): Promise<RegisterUserRes> {
    return await this.appRepo.registerUser(data);
  }

  async updateUser(data: UpdateUserDto): Promise<StatusResponse> {
    return await this.appRepo.updateUser(data);
  }

  async deleteUser(id: number): Promise<StatusResponse> {
    const deleteTeam = await this.deleteTeam(id);

    if (deleteTeam.status === 'ok') {
      return await this.appRepo.deleteUser(id);
    } else {
      return deleteTeam;
    }
  }

  //teams
  async getTeam(idOwner: number): Promise<Teams[]> {
    return await this.appRepo.getTeam(idOwner);
  }

  async saveTeam(data: SaveTeamDto[]): Promise<StatusResponse> {
    try {
      await this.appRepo.deleteTeam(data[0].idOwner);

      for (const p of data) {
        await this.appRepo.saveTeam(p);
      }

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error ${err}` };
    }
  }

  async deleteTeam(idOwner: number): Promise<StatusResponse> {
    return this.appRepo.deleteTeam(idOwner);
  }
}
