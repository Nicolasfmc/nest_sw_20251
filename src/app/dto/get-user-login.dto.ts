import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
