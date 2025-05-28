import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RegisterUserRes, StatusResponse } from 'src/interfaces';
import { Users } from 'src/user/entities/users.entity';
import { RegisterUserDto } from 'src/app/dto/register-user.dto';
import { UpdateUserDto } from 'src/app/dto/update-user.dto';
  
@Injectable()
export class AppRepository {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Users)
    private readonly pkUsersRepo: Repository<Users>,
  ) {}

  public async getTeam(idOwner: number): Promise<Teams[]> {
    try {
      const query = `SELECT * FROM PK_TEAMS WHERE ID_OWNER = ${idOwner}`;

      return await this.entityManager.query(query);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteTeam(idOwner: number): Promise<StatusResponse> {
    try {
      const query = `DELETE FROM PK_TEAMS WHERE ID_OWNER = ${idOwner}`;
      await this.entityManager.query(query);

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }

  public async saveTeam({
    idOwner,
    pokemonId,
    pokemonName,
  }: SaveTeamDto): Promise<StatusResponse> {
    try {
      const query = `INSERT INTO PK_TEAMS (ID_OWNER, POKEMON_ID, POKEMON_NAME) VALUES (${idOwner}, ${pokemonId}, '${pokemonName}')`;
      await this.entityManager.query(query);

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }
}
  