import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgresService implements OnApplicationBootstrap {
  constructor(
    private dataSource: DataSource,
    @Inject('CLIENT_IDENTIFIER') private clientIdentifier: string,
  ) {}

  async onApplicationBootstrap() {
    // Inicializa a conexão com o PostgreSQL e define o application_name
    const connection = this.dataSource;

    if (connection.isInitialized) {
      try {
        await connection.query(
          `SET application_name TO '${this.clientIdentifier}'`,
        );
        console.log(`application_name definido como '${this.clientIdentifier}'`);
      } catch (error) {
        console.error('Erro ao definir application_name:', error);
      }
    } else {
      console.error('Conexão com o PostgreSQL não foi inicializada.');
    }
  }
}
