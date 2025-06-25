import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { AuthJWTService } from "./authJWT.service";
import { HashService } from "./hash.service";
import { UserProfileModule } from "src/userprofile/userProfile.module";
import { UserProfile } from "src/schemas/userProfileSchema";
import { UserProfileService } from "src/userprofile/userProfile.service";
import { UserProfileController } from "src/userprofile/userProfile.controller";

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    UserProfileModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, UserProfileController],
  providers: [
    AuthService,
    AuthJWTService,
    HashService,
    UserProfileService,
  ],
  exports: [
    JwtModule,
  ]
})
export class AuthModule {}