import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UserProfileService } from 'src/userprofile/userProfile.service';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from 'src/schemas/ProjectSchema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/request/CreateProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(dto: CreateProjectDto, userId: string): Promise<Project> {
    const project = new this.projectModel({
      userId: new Types.ObjectId(userId),
      title: dto.title,
      description: dto.discription,
      links: dto.links,
      previewImage: dto.previewImage
    })

    return project.save();
  }

  async 

}
