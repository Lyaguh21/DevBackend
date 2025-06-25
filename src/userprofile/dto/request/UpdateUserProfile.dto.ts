import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty()
  @IsString()
  id: string;
  
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
}
