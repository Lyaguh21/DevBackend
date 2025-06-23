import {Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/Register.dto';
import { pseudoRandomBytes } from 'crypto';
import { AuthDto } from './dto/request/Auth.dto';
import { AccessTokenResponse } from './dto/response/AccessToken.dto';
import { User } from 'src/schemas/userSchema';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post('login')
  async auth(@Body() body: AuthDto){
    return this.authService.auth(body)
  }
}
