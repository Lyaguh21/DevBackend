import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from 'src/schemas/userProfileSchema';
import { UserProfileService } from './userProfile.service';
import { UserProfileController } from './userProfile.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProfile.name,
        schema: UserProfileSchema,
      },
    ]),
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService, MongooseModule]
})
export class UserProfileModule {}
