import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/ProjectSchema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { UserProfileService } from 'src/userprofile/userProfile.service';
import { UserProfileModule } from 'src/userprofile/userProfile.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
    UserProfileModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService, MongooseModule]
})
export class ProjectModule {}
