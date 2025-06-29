import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserProfileModule } from './userprofile/userProfile.module';
import { ProjectModule } from './projects/project.module';
import { ImageModule } from './base64/image.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017'),
    UsersModule,
    AuthModule,
    UserProfileModule,
    ProjectModule,
    ImageModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
