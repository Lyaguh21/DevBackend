import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/ProjectSchema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService, MongooseModule]
})
export class ProjectModule {}
