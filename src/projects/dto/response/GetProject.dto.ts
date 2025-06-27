import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetProjectDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  links: string[];

  @ApiProperty()
  @IsString()
  previewImage?: string;
}
