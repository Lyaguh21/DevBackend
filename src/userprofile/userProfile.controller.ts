import { Body, Controller, Get, Param, Patch} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserProfileService } from './userProfile.service';
import { UpdateUserProfileDto } from './dto/request/UpdateUserProfile.dto';


@ApiTags('users')
@Controller('users')
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
}

