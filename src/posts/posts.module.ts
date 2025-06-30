import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from 'src/schemas/postsSchema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Posts.name,
        schema: PostsSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, MongooseModule]
})
export class PostsModule {}
