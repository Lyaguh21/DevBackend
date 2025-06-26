import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetProfileDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  workplace?: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  avatar?: string;
}
