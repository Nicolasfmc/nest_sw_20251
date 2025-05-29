import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { StatusResponse } from 'src/user/src/interfaces';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from 'src/app/dto/save-team.dto';
  
@Injectable()
export class TeamsRepository {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Teams)
    private readonly pkTeamsRepo: Repository<Teams>,
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
  