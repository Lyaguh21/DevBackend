import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          if (!request?.cookies?.jwt) {
            throw new UnauthorizedException('JWT token not found in cookies');
          }
          return request.cookies.jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload); // Проверить, что sub есть
    return { sub: payload.sub, username: payload.username }; // Явно возвращаем объект
  }
}
