import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/request/Auth.dto';
import { RegisterDto } from './dto/request/Register.dto';
import { UsersService } from 'src/users/users.service';
import { HashService } from './hash.service';
import { User } from 'src/schemas/userSchema';
import { AuthJWTService } from './authJWT.service';
import { LoginResponseDto } from './dto/response/LoginResponse.dto';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;

  constructor(
    private configService: ConfigService,
    private hashService: HashService,
    private userService: UsersService,
    private authJwtService: AuthJWTService,
  ) {}

  async auth(dto: AuthDto): Promise<LoginResponseDto> {
    const nickname = dto.nickname.trim();

    const user = await this.userService.GetByNickname(nickname);
    if (!user) {
      throw new ConflictException('Такого пользователя не существует');
    }
    const passwordExists = await this.hashService.validatePassword(
      dto.password.trim(),
      user.password,
    );

    if (!passwordExists) {
      throw new ConflictException('Неверный логин или пароль');
    }

    var token = await this.authJwtService.createAuthJWT(user.id);

    return {
      id: user.id,
      nickname: user.nickname,
      role: user.role,
      JWTtoken: token.access_token,
    };
  }

  public async register(dto: RegisterDto): Promise<LoginResponseDto> {
    const email = dto.email.trim();
    const nickname = dto.nickname.trim();
    const fn = dto.firstName.trim();
    const ln = dto.lastName.trim();

    const emailExists = await this.userService.GetIDByEmail(email);
    const nicknameExists = await this.userService.GetIDByNickname(nickname);

    if (emailExists) {
      throw new ConflictException('Такой email уже зарегистрирован');
    }
    if (nicknameExists) {
      throw new ConflictException('Никнейм занят');
    }

    const newUser = await this.userService.create({
      firstName: fn,
      lastName: ln,
      nickname: nickname,
      email: email,
      password: await this.hashService.createHashPassword(dto.password),
      role: dto.role,
    });
    console.log(newUser);
    console.log(newUser._id.toString());
    const token = await this.authJwtService.createAuthJWT(
      newUser._id.toString(),
    );

    return {
      id: newUser._id.toString(),
      nickname: newUser.nickname,
      role: newUser.role,
      JWTtoken: token.access_token,
    };
  }
}
