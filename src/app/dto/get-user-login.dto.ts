import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserLoginDto {
  @ApiProperty({
    description: 'Nome de usuário',
    example: 'ashKetchum',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Pikachu123',
  })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
