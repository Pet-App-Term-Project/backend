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
import { ObjectId } from 'src/pipes/parse-object-id.pipe';

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

  async createMatchUser(userId: ObjectId, addMatchUserDto: AddMatchUserDto) {
    const createMatchUser = await this.addMatchUserModel.create({
      name: addMatchUserDto.name,
      age: addMatchUserDto.age,
      species: addMatchUserDto.species,
      photoURL: addMatchUserDto.photoURL,
      petDescription: addMatchUserDto.petDescription,
      owner: userId,
    });

    return createMatchUser;
  }

  async getAllUsers() {
    const allUsers = await this.addMatchUserModel.find().populate('owner');

    console.log(allUsers);

    return allUsers;
  }
}
