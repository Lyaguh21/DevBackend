import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { AccessTokenResponse } from './dto/response/AccessToken.dto';

@Injectable()
export class AuthJWTService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

    async createAuthJWT(userId: string): Promise<AccessTokenResponse> {
    const payload = { 
      sub: userId,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '60s'),
    });

    return { 
      access_token: token,
      token_type: 'Bearer',
      expires_in: this.configService.get<string>('JWT_EXPIRES_IN', '60s'),
    };
  }
}