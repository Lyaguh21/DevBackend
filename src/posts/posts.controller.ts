import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/requests/CreatePost.dto';
import { GetPostDto } from './dto/response/GetPost.dto';
import { User } from 'src/users/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() dto: CreatePostDto, @User() user: { sub: string }) {
    console.log('User sub from token in controller:', user.sub); // Должно быть 685c3d951d3397e80dcf67ce
    return this.postsService.create(dto, user.sub);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserPosts(@User() user: { sub: string }): Promise<GetPostDto[]> {
    if (!user?.sub) {
      throw new BadRequestException('User ID is missing');
    }
    return this.postsService.getPostsByAuthor(user.sub);
  }
}
