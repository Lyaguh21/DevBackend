import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileService } from './userProfile.service';

@ApiTags('users')
@Controller()
export class UserProfileController {
  constructor(private UserProfileService: UserProfileService) {}

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.UserProfileService.GetProfileByID(id)
    }
}
