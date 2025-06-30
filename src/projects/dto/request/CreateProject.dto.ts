import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
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

  @ApiProperty()
  @IsString()
  previewImage?: string;
}
