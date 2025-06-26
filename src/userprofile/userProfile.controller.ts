import { Body, Controller, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileService } from './userProfile.service';
import { UpdateUserProfileDto } from './dto/request/UpdateUserProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@ApiTags('users')
@Controller('profiles')
export class UserProfileController {
  constructor(private UserProfileService: UserProfileService) {}

  @Get(':id')
  async getUserProfileById(@Param('id') id: string) {
    return this.UserProfileService.GetProfileByID(id);
  }

  @Patch(':id')
  async updateUserProfile(@Param('id') id: string, @Body()dto: UpdateUserProfileDto) {
    return this.UserProfileService.UpdateProfile(dto, id);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async encodeImageToBase64(@UploadedFile() file: Multer.File): Promise<{ base64: string }> {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const base64String = file.buffer.toString('base64');
    return { base64: base64String };
  }
}

