import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 12,
  })
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
