import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/request/Register.dto';
import { AuthDto } from './dto/request/Auth.dto';
import { LoginResponseDto } from './dto/response/LoginResponse.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<LoginResponseDto> {
    return this.authService.register(body);
  }

  @Post('login')
  async auth(@Body() body: AuthDto): Promise<LoginResponseDto> {
    return this.authService.auth(body);
  }
}
