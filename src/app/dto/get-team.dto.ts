import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetTeamDto {
  @IsNumberString()
  @IsNotEmpty()
  idOwner: number;
}
