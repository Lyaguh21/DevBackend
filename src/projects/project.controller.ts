import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/request/CreateProject.dto';
import { GetProjectDto } from './dto/response/GetProject.dto';
import { UpdateProjectDto } from './dto/request/UpdateProject.dto';

@ApiTags('Projects')
@Controller('users/:id/portfolio')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  async create(
    @Body() body: CreateProjectDto,
    @Param('id') userId: string,
  ): Promise<GetProjectDto> {
    return this.projectService.create(body, userId);
  }

  @Get(':projectId')
  async getProject(
    @Param('projectId') projectId: string,
  ): Promise<GetProjectDto> {
    return this.projectService.GetProjectById(projectId);
  }

  @Patch(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDto,
  ): Promise<GetProjectDto> {
    return this.projectService.update(body, projectId);
  }
}
