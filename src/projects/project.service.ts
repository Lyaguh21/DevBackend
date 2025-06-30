import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from 'src/schemas/ProjectSchema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/request/CreateProject.dto';
import { UpdateProjectDto } from './dto/request/UpdateProject.dto';
import { GetProjectDto } from './dto/response/GetProject.dto';
import { UserProfileService } from 'src/userprofile/userProfile.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private userProfileService: UserProfileService,
  ) {}

  async create(dto: CreateProjectDto, userId: string): Promise<GetProjectDto> {
    const project = new this.projectModel({
      userId: new Types.ObjectId(userId),
      title: dto.title,
      description: dto.description,
      links: dto.links,
      previewImage: dto.previewImage,
    });

    await project.save();

    await this.userProfileService.addNewProject(userId, project.id.toString());

    return await this.GetProjectById(project.id.toString());
  }

  async GetProjectById(id: string): Promise<GetProjectDto> {
    const project = await this.projectModel
      .findById(new Types.ObjectId(id))
      .lean()
      .exec();
    if (!project) {
      throw new NotFoundException('Проект не найден');
    }
    return {
      id: project._id.toString(),
      title: project.title,
      description: project.description,
      links: project.links,
      previewImage: project.previewImage,
    };
  }

  async update(
    dto: UpdateProjectDto,
    projectId: string,
  ): Promise<GetProjectDto> {
    const newproject = await this.projectModel
      .findByIdAndUpdate(
        new Types.ObjectId(projectId),
        {
          title: dto.title,
          description: dto.description,
          links: dto.links,
          previewImage: dto.previewImage,
        },
        { new: true },
      )
      .exec();
    if (!newproject) {
      throw new NotFoundException('Не удалось обновить профиль');
    }
    return await this.GetProjectById(projectId);
  }

  async deleteProject(id: string) {
    const delproject = await this.projectModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
    if (!delproject) {
      throw new NotFoundException(
        `Профиль не найден`,
      );
    }
    return { message: 'Проект успешно удален' };
  }
}
