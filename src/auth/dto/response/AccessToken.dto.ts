import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AccessTokenResponse {
  @ApiProperty()
  @IsString()
  JWT_TOKEN: string;
}