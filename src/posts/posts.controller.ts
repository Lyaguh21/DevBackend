import { Body, Controller, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { PostsService } from './posts.service';

@ApiTags('users')
@Controller('users')
export class PostsController {
  constructor(private PostsService: PostsService) {}

}

