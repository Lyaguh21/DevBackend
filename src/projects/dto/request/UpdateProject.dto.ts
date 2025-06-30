import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, ValidateNested, IsArray } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    required: false,
    type: [String],
    nullable: true,
    example: ["http://example.com", null, null] 
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  links?: (string | null)[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  previewImage?: string;
}