import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthJWTService } from './authJWT.service';
import { HashService } from './hash.service';
import { UserProfileModule } from '../userprofile/userProfile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from '../schemas/userProfileSchema';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: UserProfile.name, schema: UserProfileSchema }]),
    UsersModule,
    UserProfileModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h') 
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthJWTService,
    HashService,
    JwtStrategy,
  ],
  exports: [
    JwtModule,
    AuthJWTService,
    HashService,
  ]
})
export class AuthModule {}