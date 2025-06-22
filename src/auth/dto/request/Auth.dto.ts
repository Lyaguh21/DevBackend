import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  password: string;
}
