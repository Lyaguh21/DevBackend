import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  workplace?: string;

  @ApiProperty()
  @IsString()
  role?: string;

  @ApiProperty()
  @IsString()
  avatar?: string;
}
