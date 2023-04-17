import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AddMatchUserDto } from 'src/dtos/add-match-user.dto';
import {
  AddMatchUser,
  AddMatchUserDocument,
} from 'src/schemas/add-match-user.schema';
import { MediaService } from '../media/media.service';
import { InjectModel } from '@nestjs/mongoose';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';

@Injectable()
export class AddMatchUserService {
  constructor(
    @InjectModel(AddMatchUser.name)
    private readonly addMatchUserModel: Model<AddMatchUserDocument>,
    private readonly media: MediaService,
  ) {}

  async uploadImageToCloudinary(file: MulterFile) {
    return await this.media.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async createMatchUser(addMatchUserDto: AddMatchUserDto) {
    const createMatchUser = await this.addMatchUserModel.create({
      petName: addMatchUserDto.petName,
      petAge: addMatchUserDto.petAge,
      petSpecie: addMatchUserDto.petSpecie,
      petType: addMatchUserDto.petType,
    });

    return createMatchUser;
  }
}
