import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsString()
  type?: string;

  @ApiProperty()
  @IsString()
  direction?: string;

  @ApiProperty()
  @IsString()
  previewImage?: string;
}
