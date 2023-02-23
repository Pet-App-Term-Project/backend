import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeUserInformationDto } from 'src/dtos/change-user-informations.dto';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async changeUserInformation(
    changeUserInformationDto: ChangeUserInformationDto,
    userId: ObjectId,
  ) {
    const { email, firstName, lastName } = changeUserInformationDto;
    const user = await this.userModel
      .findOneAndUpdate(userId, changeUserInformationDto, { new: true })
      .lean();

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
