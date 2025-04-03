import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteTeamDto {
  @ApiProperty({
    description: 'ID do dono do Time de Pokémon',
    example: 12345,
  })
  @IsNumberString()
  @IsNotEmpty()
  idOwner: number;
}
