import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteTeamDto {
  @IsNumberString()
  @IsNotEmpty()
  idOwner: number;
}
