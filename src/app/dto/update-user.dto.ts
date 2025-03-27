import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  senha?: string;

  @IsNumber()
  @IsOptional()
  idade?: number;

  @IsNumber()
  @IsOptional()
  indInativo?: number;

  @IsNumber()
  @IsOptional()
  indAdmin?: number;

  @IsNumber()
  @IsOptional()
  indPlano?: number;
}
