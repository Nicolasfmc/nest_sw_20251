import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsNumber()
  @IsNotEmpty()
  idade: number;

  @IsNumber()
  @IsOptional()
  indPlano: number;

  @IsNumber()
  @IsOptional()
  indInativo: number;

  @IsNumber()
  @IsOptional()
  indAdmin: number;
}
