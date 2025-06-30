import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenResponse } from './dto/response/AccessToken.dto';
import { Response } from 'express';

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

  async setAuthCookie(res: Response, token: string): Promise<void> {
    const expiresIn = this.configService.get<number>('JWT_COOKIE_EXPIRES_IN', 86400);
    
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: expiresIn * 1000,
      domain: this.configService.get('DOMAIN'),
      path: '/',
    });
  }

  async clearAuthCookie(res: Response): Promise<void> {
    res.clearCookie('jwt', {
      domain: this.configService.get('DOMAIN'),
      path: '/',
    });
  }
}