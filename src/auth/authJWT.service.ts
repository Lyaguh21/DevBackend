import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenResponse } from './dto/response/AccessToken.dto';
import { response } from 'express';

@Injectable()
export class AuthJWTService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async SetAuthCookie(userId: string) {
    const payload = { 
      sub: userId
    };

    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '3600s');


    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: expiresIn,
    });

    response.cookie("access_token", token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: parseInt(expiresIn) * 1000,
    })

    return {message: 'Токен у тебя в куку ебись сам как хочешь'}
  }
}