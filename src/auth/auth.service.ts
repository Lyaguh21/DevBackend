import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/Authdto';
import { RegisterDto } from './dto/RegisterDto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/userSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private hashService: HashService,
    private userService: UsersService,
  ) {
    const secret = this.configService.get<string>('JWT_SECRET_KEY');
    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
    }
    this.JWT_SECRET = secret;
  }

  async auth(dto: AuthDto) {}

  public async register(dto: RegisterDto) {
    const email = dto.email.trim();
    const nickname = dto.nickname.trim();
    const fn = dto.firstName.trim();
    const ln = dto.lastName.trim();

    const emailExists = await this.userService.emailExists(email);
    const nicknameExists = await this.userService.nicknameExists(nickname);

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

    return newUser;
  }
}