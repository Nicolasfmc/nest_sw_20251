import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveTeamDto {
  @IsNumber()
  @IsNotEmpty()
  idOwner: number;

  @IsNumber()
  @IsNotEmpty()
  pokemonId: number;

  @IsString()
  @IsNotEmpty()
  pokemonName: string;
}
