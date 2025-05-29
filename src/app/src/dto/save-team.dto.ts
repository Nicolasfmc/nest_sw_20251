import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SaveTeamDto {
  @ApiProperty({
    description: 'ID do dono do Time de Pokémon',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  idOwner: number;

  @ApiProperty({
    description: 'ID do Pokémon',
    example: 25,
  })
  @IsNumber()
  @IsNotEmpty()
  pokemonId: number;

  @ApiProperty({
    description: 'Nome do Pokémon',
    example: 'Pikachu',
  })
  @IsString()
  @IsNotEmpty()
  pokemonName: string;
}
