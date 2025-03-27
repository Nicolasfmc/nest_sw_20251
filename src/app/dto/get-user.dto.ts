import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetUserDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
