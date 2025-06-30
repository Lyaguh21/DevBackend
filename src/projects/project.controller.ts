import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/request/CreateProject.dto';
import { GetProjectDto } from './dto/response/GetProject.dto';
import { UpdateProjectDto } from './dto/request/UpdateProject.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('Projects')
@Controller('users/:id/portfolio')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: CreateProjectDto,
    @Param("id") id: string,
  ): Promise<GetProjectDto> {
    return this.projectService.create(body, id);
  }

  @Get(':projectId')
  @UseGuards(JwtAuthGuard)
  async getProject(
    @Param('projectId') projectId: string,
  ): Promise<GetProjectDto> {
    return this.projectService.GetProjectById(projectId);
  }

  @Patch(':projectId')
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDto,
  ): Promise<GetProjectDto> {
    return this.projectService.update(body, projectId);
  }


  @Delete(':projectId')
  async deleteProject(
    @Param('projectId') projectId: string){
      return this.projectService.deleteProject(projectId)
    }
}

