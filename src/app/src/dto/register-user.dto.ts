import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
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
    description: 'Nome completo do usuário',
    example: 'Ash Ketchum Jr.',
  })
  @IsNumber()
  @IsNotEmpty()
  idade: number;

  @ApiProperty({
    description: 'ID do plano de assinatura do usuário',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  indPlano: number;

  @ApiProperty({
    description: 'Indicador de inatividade da conta',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  indInativo: number;

  @ApiProperty({
    description: 'Indicador se o usuário é um administrador',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  indAdmin: number;
}
