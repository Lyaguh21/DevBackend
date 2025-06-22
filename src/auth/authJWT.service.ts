import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenResponse } from './dto/response/AccessToken.dto';

@Injectable()
export class AuthJWTService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createAuthJWT(id: string): Promise<AccessTokenResponse> {
    const token = await this.jwtService.signAsync(id);

    return { JWT_TOKEN: token };
  }
}
