import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 12,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'ashKetchum',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Pikachu123',
  })
  @IsString()
  @IsOptional()
  senha?: string;

  @ApiProperty({
    description: 'Idade do usuário',
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  idade?: number;

  @ApiProperty({
    description: 'Indicador de inatividade da conta',
    example: 0,
  })
  @IsNumber()
  @IsOptional()
  indInativo?: number;

  @ApiProperty({
    description: 'Indicador se o usuário é um administrador',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  indAdmin?: number;

  @ApiProperty({
    description: 'ID do plano de assinatura do usuário',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  indPlano?: number;
}
