import { FileInterceptor } from '@nest-lab/fastify-multer';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AddMatchUserService } from './add-match-user.service';
import { ApiConsumes } from '@nestjs/swagger';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';

@Controller('add-match-user')
export class AddMatchUserController {
  constructor(private readonly addMatchUserService: AddMatchUserService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  uploadImageToCloudinary(@UploadedFile() file: MulterFile) {
    console.log('image', file);
    return this.addMatchUserService.uploadImageToCloudinary(file);
  }
}
