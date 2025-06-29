import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async encodeImageToBase64(@UploadedFile() file: Multer.File): Promise<{ base64: string }> {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const base64String = file.buffer.toString('base64');
    return { base64: base64String };
  }
}

