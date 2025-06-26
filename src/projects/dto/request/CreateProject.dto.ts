import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  discription?: string;

  @ApiProperty()
  @IsEmail()
  links: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  previewImage?: string;
}