import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { RegisterUserRes, StatusResponse } from 'src/interfaces';
import { RegisterUserDto } from './dto/register-user.dto';
import { Teams } from './entities/teams.entity';
import { SaveTeamDto } from './dto/save-team.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AppRepository {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Users)
    private readonly pkUsersRepo: Repository<Users>,
    @InjectRepository(Teams)
    private readonly pkTeamsRepo: Repository<Teams>,
  ) {}

  // User
  public async getUser(id: number): Promise<Users> {
    const res = await this.entityManager.query(
      `SELECT * FROM PK_USERS WHERE ID = ${id} AND IND_INATIVO = 0`,
    );
    // const res = await this.pkUsersRepo.findOne({
    //   where: { id, indInativo: 0 },
    // });

    if (!res) throw new NotFoundException('Usuário não encontrado!');

    return res;
  }

  public async getUserLogin(username: string, senha: string): Promise<Users> {
    const query = `SELECT * FROM PK_USERS WHERE username = '${username}' AND senha = '${senha}' AND IND_INATIVO = 0`;

    return await this.entityManager.query(query);
  }

  public async getAllUsers(): Promise<Users[]> {
    const query = `SELECT * FROM PK_USERS`;

    return await this.entityManager.query(query);
  }

  public async registerUser({
    username,
    senha,
    idade,
    indPlano,
    indAdmin,
    indInativo,
  }: RegisterUserDto): Promise<RegisterUserRes> {
    const alreadyExists = await this.entityManager.query(
      `SELECT ID FROM PK_USERS WHERE USERNAME = '${username}'`,
    );

    if (alreadyExists[0]?.id)
      throw new ConflictException('Usuário já existente!');

    try {
      const res = this.entityManager.transaction(
        async (transactionalEntityManager) => {
          const insertQuery = `
          INSERT INTO PK_USERS (USERNAME, SENHA, IDADE, IND_PLANO, IND_ADMIN, IND_INATIVO)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING ID
        `;
          const result = await transactionalEntityManager.query(insertQuery, [
            username,
            senha,
            idade,
            indPlano,
            indAdmin,
            indInativo,
          ]);

          return {
            id: result[0].id,
            username,
            idade,
            indAdmin,
          };
        },
      );

      return await res;
    } catch (err) {
      throw new BadRequestException(
        'Erro inesperado, verifique os dados e tente novamente!',
      );
    }
  }

  public async updateUser({
    id,
    username,
    senha,
    idade,
    indAdmin,
    indPlano,
    indInativo,
  }: UpdateUserDto): Promise<StatusResponse> {
    const userExists = await this.entityManager.query(
      `SELECT ID FROM PK_USERS WHERE ID = $1`,
      [id],
    );

    if (!userExists[0]?.id) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const fieldsToUpdate = [];
    const values = [];

    if (username !== undefined) {
      fieldsToUpdate.push(`USERNAME = $${fieldsToUpdate.length + 1}`);
      values.push(username);
    }
    if (senha !== undefined) {
      fieldsToUpdate.push(`SENHA = $${fieldsToUpdate.length + 1}`);
      values.push(senha);
    }
    if (idade !== undefined) {
      fieldsToUpdate.push(`IDADE = $${fieldsToUpdate.length + 1}`);
      values.push(idade);
    }
    if (indAdmin !== undefined) {
      fieldsToUpdate.push(`IND_ADMIN = $${fieldsToUpdate.length + 1}`);
      values.push(indAdmin);
    }
    if (indInativo !== undefined) {
      fieldsToUpdate.push(`IND_INATIVO = $${fieldsToUpdate.length + 1}`);
      values.push(indInativo);
    }
    if (indPlano !== undefined) {
      fieldsToUpdate.push(`IND_PLANO = $${fieldsToUpdate.length + 1}`);
      values.push(indPlano);
    }

    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('Nenhum campo para atualizar!');
    }

    const updateQuery = `
      UPDATE PK_USERS
      SET ${fieldsToUpdate.join(', ')}
      WHERE ID = ${id}
      RETURNING ID, USERNAME, IDADE, IND_ADMIN, IND_INATIVO, IND_PLANO
    `;

    try {
      const res = await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.query(updateQuery, values);

          return { status: 'Usuário atualizado com sucesso!' };
        },
      );

      return res;
    } catch (err) {
      throw new BadRequestException(
        'Erro inesperado, verifique os dados e tente novamente!',
      );
    }
  }

  public async deleteUser(id: number): Promise<StatusResponse> {
    try {
      const query = `UPDATE PK_USERS SET IND_INATIVO = 1 WHERE ID = ${id}`;
      await this.entityManager.query(query);

      return { status: 'ok' };
    } catch (err) {
      return { status: `Error: ${err}` };
    }
  }

  // Teams
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
