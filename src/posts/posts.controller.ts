import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/requests/CreatePost.dto';
import { GetPostDto } from './dto/response/GetPost.dto';
import { User } from 'src/users/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePostDto } from './dto/requests/UpdatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() dto: CreatePostDto, @User() user: { sub: string }) {
    return this.postsService.create(dto, user.sub);
  }

  @Get("user")
  @UseGuards(JwtAuthGuard)
  async getUserPosts(@User() user: { sub: string }): Promise<GetPostDto[]> {
    return this.postsService.getPostsByAuthor(user.sub);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async LikePost(
    @Param('id') id: string,
    @User() user: { sub: string },
  ): Promise<GetPostDto> {
    return this.postsService.PutLike(id, user.sub);
  }

  @Delete(':id/like')
  @UseGuards(JwtAuthGuard)
  async UnLikePost(
    @Param('id') id: string,
    @User() user: { sub: string },
  ): Promise<GetPostDto> {
    return this.postsService.RemoveLike(id, user.sub);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async DeletePost(@Param("id") id: string){
    return this.postsService.DeletePost(id)
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async UpdatePost(@Param("id") id: string, @Body() dto: UpdatePostDto): Promise<GetPostDto>{
    return this.postsService.UpdatePost(id, dto)
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async GetPostById(@Param("id") id: string): Promise<GetPostDto>{
    return this.postsService.GetPostByID(id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async GetAllPosts(): Promise<GetPostDto[]>{
    return this.postsService.GetAllPosts()
  }
}
