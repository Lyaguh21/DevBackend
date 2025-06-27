import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GetProjectDto } from 'src/projects/dto/response/GetProject.dto';

export class GetProfileDto {
  @ApiProperty({ type: String, description: 'ID пользователя' })
  userId: string;

  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия' })
  lastName: string;

  @ApiProperty({ description: 'Никнейм' })
  nickname: string;

  @ApiPropertyOptional({ description: 'Описание профиля' })
  description?: string;

  @ApiPropertyOptional({ description: 'Место работы' })
  workplace?: string;

  @ApiProperty({ description: 'Роль' })
  role: string;

  @ApiPropertyOptional({ description: 'Аватар' })
  avatar?: string;

  @ApiProperty({ type: [GetProfileDto], description: 'Портфолио проектов' })
  portfolio: GetProjectDto[];
}