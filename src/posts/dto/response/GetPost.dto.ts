import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class GetPostDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  direction: string;

  @ApiProperty()
  @IsNumber()
  likes: Number;

  @ApiProperty()
  likesBy: Types.ObjectId[];

  @ApiProperty()
  @IsString()
  previewImage?: string;
}
