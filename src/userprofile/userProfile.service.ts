import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from 'src/schemas/userProfileSchema';
import { User } from 'src/schemas/userSchema';
import { UpdateUserProfileDto } from './dto/request/UpdateUserProfile.dto';
import { CreateUserProfileDto } from './dto/request/CreateProfile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
  ) {}

  async create(dto: CreateUserProfileDto): Promise<UserProfile> {
    const profile = new this.userProfileModel({
      userId: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role, 
      description: '',
      workplace: '',
      portfolio: [],
    });

    return profile.save();
  }

  async GetProfileByID(id: string): Promise<UserProfile> {
    const profile = await this.userProfileModel.findById(id).exec();
    if (!profile) {
      throw new Error('Пользователь не найден');
    }
    return profile;
  }

  // async UpdateProfile(dto: UpdateUserProfileDto) {
  //   const profile = this.userProfileModel.updateOne();
  // }
}
