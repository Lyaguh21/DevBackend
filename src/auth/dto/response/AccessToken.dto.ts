import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AccessTokenResponse {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  token_type?: string;

  @ApiProperty()
  @IsString()
  expires_in?: string;
}
