import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PK_USERS')
export class Users {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'USERNAME' })
  username: string;

  @Column({ name: 'SENHA' })
  senha: string;

  @Column({ name: 'DTA_CADASTRO', default: 'NOW()' })
  dtaCadastro: string;

  @Column({ name: 'IND_INATIVO' })
  indInativo: number;

  @Column({ name: 'IND_ADMIN' })
  indAdmin: number;

  @Column({ name: 'IDADE' })
  idade: number;

  @Column({ name: 'IND_PLANO', nullable: true })
  indPlano?: number;
}
