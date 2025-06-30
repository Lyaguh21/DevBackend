import { ConflictException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/request/Auth.dto';
import { RegisterDto } from './dto/request/Register.dto';
import { UsersService } from 'src/users/users.service';
import { HashService } from './hash.service';
import { AuthJWTService } from './authJWT.service';
import { LoginResponseDto } from './dto/response/LoginResponse.dto';
import { UserProfileService } from 'src/userprofile/userProfile.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private userService: UsersService,
    private authJwtService: AuthJWTService,
    private userProfileService: UserProfileService,
  ) {}

  async auth(dto: AuthDto, res: Response): Promise<LoginResponseDto> {
    const nickname = dto.nickname.trim();

    const user = await this.userService.GetUserByNickname(nickname);
    if (!user) {
      throw new ConflictException('Такого пользователя не существует');
    }

    const userProfile = await this.userProfileService.GetProfileByID(user._id.toString());
    if (!userProfile) {
      throw new ConflictException('Профиль пользователя не найден');
    }

    const passwordValid = await this.hashService.validatePassword(
      dto.password.trim(),
      user.password,
    );

    if (!passwordValid) {
      throw new ConflictException('Неверный логин или пароль');
    }

    const { accessToken, refreshToken } = await this.authJwtService.createAuthTokens(user.id);
    await this.authJwtService.setAuthCookies(res, {
      accessToken: accessToken.access_token,
      refreshToken: refreshToken.refresh_token,
    });

    return {
      id: user.id,
      nickname: user.nickname,
      role: userProfile.role,
    };
  }

  public async register(dto: RegisterDto, res: Response): Promise<LoginResponseDto> {
    const email = dto.email.trim();
    const nickname = dto.nickname.trim();
    const firstName = dto.firstName.trim();
    const lastName = dto.lastName.trim();

    const emailExists = await this.userService.GetIDByEmail(email);
    const nicknameExists = await this.userService.GetIDByNickname(nickname);

    if (emailExists) {
      throw new ConflictException('Такой email уже зарегистрирован');
    }
    if (nicknameExists) {
      throw new ConflictException('Никнейм занят');
    }

    const newUser = await this.userService.create({
      nickname: nickname,
      email: email,
      password: await this.hashService.createHashPassword(dto.password),
    });

    const { accessToken, refreshToken } = await this.authJwtService.createAuthTokens(newUser._id.toString());
    const userProfile = await this.userProfileService.create({
      id: newUser._id.toString(),
      firstName: firstName,
      lastName: lastName,
      role: dto.role,
    });

    await this.authJwtService.setAuthCookies(res, {
      accessToken: accessToken.access_token,
      refreshToken: refreshToken.refresh_token,
    });

    return {
      id: newUser._id.toString(),
      nickname: newUser.nickname,
      role: userProfile.role,
    };
  }

  async logout(res: Response): Promise<{ message: string }> {
    await this.authJwtService.clearAuthCookies(res);
    return { message: 'Вы успешно вышли из системы' };
  }

  async validateUserById(userId: string): Promise<boolean> {
    const user = await this.userService.GetUserByID(userId);
    return !!user;
  }
}