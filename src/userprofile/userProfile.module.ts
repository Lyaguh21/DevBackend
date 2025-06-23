import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from 'src/schemas/userProfileSchema';
import { UserProfileService } from './userProfile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProfile.name,
        schema: UserProfileSchema,
      },
    ]),
  ],
  providers: [UserProfileService],
  exports: [UserProfileService, MongooseModule]
})
export class UserProfileModule {}
