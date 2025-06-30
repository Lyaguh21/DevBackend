import { ApiProperty } from '@nestjs/swagger';
import {  IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString({ each: true })
  links?: string[];

  @ApiProperty()
  @IsString()
  previewImage?: string;
}