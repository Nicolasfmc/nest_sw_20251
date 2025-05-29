import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('JWT_TOKENS')
export class JwtTokens {
  @PrimaryColumn({ name: 'TOKEN' })
  token: string;

  @Column({ name: 'TYPE' })
  type: number; // 1 - ACCESS, 2 - REFRESH

  @Column({ name: 'VALID_DATE', type: 'timestamp' })
  validDate: string | Date;

  @Column({ name: 'USERNAME' })
  username: string;

  @Column({ name: 'IS_INVALID', default: 0 })
  isInvalid: number; // 0 - VÁLIDO, 1 - INVÁLIDO
}
