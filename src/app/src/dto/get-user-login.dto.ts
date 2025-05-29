import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'Token de acesso',
    example: 'adwagawdwd',
  })
  @IsString()
  @IsOptional()
  accessToken?: string;

  @ApiProperty({
    description: 'Token de atualização',
    example: 'adwagawdwd',
  })
  @IsString()
  @IsOptional()
  refreshToken?: string;
}
