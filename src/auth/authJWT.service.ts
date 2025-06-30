import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenResponse} from './dto/response/AccessToken.dto';
import { Response } from 'express';
import { Types } from 'mongoose';
import { RefreshTokenResponse } from './dto/response/RefreshToken.dto';

@Injectable()
export class AuthJWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createAuthTokens(userId: string): Promise<{
    accessToken: AccessTokenResponse;
    refreshToken: RefreshTokenResponse;
  }> {
    if (!userId || !Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const payload = {
      sub: userId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
      }),
    ]);

    return {
      accessToken: {
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m'),
      },
      refreshToken: {
        refresh_token: refreshToken,
        token_type: 'Bearer',
        expires_in: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
      },
    };
  }

  async setAuthCookies(res: Response, tokens: {
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new BadRequestException('Tokens are required');
    }

    const accessTokenExpires = this.configService.get<number>(
      'JWT_ACCESS_COOKIE_EXPIRES_IN',
      900000, // 15 minutes in milliseconds
    );

    const refreshTokenExpires = this.configService.get<number>(
      'JWT_REFRESH_COOKIE_EXPIRES_IN',
      604800000, // 7 days in milliseconds
    );

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      partitioned: true,
      maxAge: accessTokenExpires,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      partitioned: true,
      maxAge: refreshTokenExpires,
      path: '/auth/refresh', // Only accessible on refresh endpoint
    });
  }

  async clearAuthCookies(res: Response): Promise<void> {
    const domain = this.configService.get('DOMAIN', 'localhost');
    
    res.clearCookie('access_token', {
      domain,
      path: '/',
    });
    
    res.clearCookie('refresh_token', {
      domain,
      path: '/auth/refresh',
    });
  }

  async verifyRefreshToken(refreshToken: string): Promise<{ userId: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      return { userId: payload.sub };
    } catch (error) {
      throw new BadRequestException('Invalid or expired refresh token');
    }
  }

  async refreshTokens(refreshToken: string): Promise<{
    accessToken: AccessTokenResponse;
    refreshToken: RefreshTokenResponse;
  }> {
    const { userId } = await this.verifyRefreshToken(refreshToken);
    return this.createAuthTokens(userId);
  }
}