import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';

@ApiTags('Auth')
@Controller()
export class ProjectController {
  constructor(private projectService: ProjectService) {}

//   @Post('register')
//   async register(@Body() body: RegisterDto): Promise<LoginResponseDto> {
//     return this.authService.register(body);
//   }

//   @Post('login')
//   async auth(@Body() body: AuthDto): Promise<LoginResponseDto> {
//     return this.authService.auth(body);
//   }
}
