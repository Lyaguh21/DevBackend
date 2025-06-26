import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from 'src/schemas/userProfileSchema';
import { UserProfileService } from './userProfile.service';
import { UserProfileController } from './userProfile.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProfile.name,
        schema: UserProfileSchema,
      },
    ]),
    UsersModule
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService, MongooseModule]
})
export class UserProfileModule {}
