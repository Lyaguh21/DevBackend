import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { UserProfile } from 'src/schemas/userProfileSchema';
import { UpdateUserProfileDto } from './dto/request/UpdateUserProfile.dto';
import { CreateUserProfileDto } from './dto/request/CreateProfile.dto';
import { UsersService } from 'src/users/users.service';
import { GetProfileDto } from './dto/response/GetProfile.dto';
import { Project } from 'src/schemas/ProjectSchema';

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
      avatar: '',
    });

    return profile.save();
  }

  async addNewProject(userId: string, projectId: string) {
    await this.userProfileModel
      .findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
        },
        { portfolio: new Types.ObjectId(projectId) },
      )
      .exec();
  }

  async GetProfileByID(id: string): Promise<GetProfileDto> {
    const profile = await this.userProfileModel
      .findOne({ userId: new Types.ObjectId(id) })
      .populate<{ portfolio: Project[] }>({
        path: 'portfolio',
        select: 'title description links previewImage',
      })
      .lean()
      .exec();

    if (!profile) {
      throw new NotFoundException('Профиль не найден');
    }

    const nickname = await this.userService.GetUserByID(id);

    return {
      userId: id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      nickname: nickname,
      description: profile.description,
      workplace: profile.workplace,
      role: profile.role,
      avatar: profile.avatar,
      portfolio: profile.portfolio.map((project) => ({
        id: project._id.toString(),
        title: project.title,
        description: project.description,
        links: project.links,
        previewImage: project.previewImage,
      })),
    };
  }

  async UpdateProfile(
    dto: UpdateUserProfileDto,
    userId: string,
  ): Promise<GetProfileDto> {
    const profile = await this.userProfileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        {
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: dto.role,
          description: dto.description,
          workplace: dto.workplace,
          avatar: dto.avatar,
        },
        { new: true },
      )
      .exec();

    if (!profile) {
      throw new NotFoundException('Не удалось обновить профиль');
    }
    return await this.GetProfileByID(userId);
  }
}
