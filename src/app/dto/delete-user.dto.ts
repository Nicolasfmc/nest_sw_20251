import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteUserDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
