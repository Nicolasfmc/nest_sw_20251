import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('PK_TEAMS')
export class Teams {
  @PrimaryColumn({ name: 'POKEMON_ID' })
  pokemonId: number;

  @Column({ name: 'ID_OWNER' })
  idOwner: number;

  @Column({ name: 'POKEMON_NAME' })
  pokemonName: string;
}
