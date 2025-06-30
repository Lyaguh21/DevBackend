import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
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
    return this.postsService.create(dto, user.sub);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserPosts(@User() user: { sub: string }): Promise<GetPostDto[]> {
    return this.postsService.getPostsByAuthor(user.sub);
  }

  @Post(":id/like")
  @UseGuards(JwtAuthGuard)
  async LikePost(@Param('id') id: string, @User() user: { sub: string }): Promise<GetPostDto> {
    return this.postsService.PutLike(id, user.sub)
  }
}
