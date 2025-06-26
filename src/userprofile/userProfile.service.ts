import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserProfile } from 'src/schemas/userProfileSchema';
import { User } from 'src/schemas/userSchema';
import { UpdateUserProfileDto } from './dto/request/UpdateUserProfile.dto';
import { CreateUserProfileDto } from './dto/request/CreateProfile.dto';
import { UsersService } from 'src/users/users.service';
import { GetProfileDto } from './dto/response/GetProfile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
    private userService: UsersService,
  ) {}

  async create(dto: CreateUserProfileDto): Promise<UserProfile> {
    const profile = new this.userProfileModel({
      userId: new Types.ObjectId(dto.id),
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
      description: '',
      workplace: '',
      portfolio: [],
    });

    return profile.save();
  }



async GetProfileByID(id: string): Promise<GetProfileDto> {
  const profile = await this.userProfileModel
    .findOne({ userId: new Types.ObjectId(id) })
    .lean()
    .exec();
  if (!profile) {
    throw new NotFoundException('Профиль не найден');
  }

  const nickname = await this.userService.GetUserByID(id)
  return {
    userId: id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    nickname: nickname,
    description: profile.description,
    workplace: profile.workplace,
    role: profile.role,
    avatar: profile.avatar
  };
}

  async UpdateProfile(dto: UpdateUserProfileDto, userId: string) {
    const profile = this.userProfileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      {
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
        description: dto.description,
        workplace: dto.workplace,
      },
      { new: true },
    ).exec();

     if (!profile) {
        throw new Error('Не удалось обновить профиль');
    }

    return profile;
  }
}
