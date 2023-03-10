import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeUserInformationDto } from 'src/dtos/change-user-informations.dto';
import { UpdateUserPasswordDto } from 'src/dtos/update-user-password.dto';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  setNotificationToken(userId: ObjectId, notificationToken: string) {
    return this.userModel
      .findByIdAndUpdate(userId, {
        notificationToken,
      })
      .lean();
  }

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

  async updateUserPassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
    userId: ObjectId,
  ) {
    const { oldPassword, newPassword, newPasswordCheck } =
      updateUserPasswordDto;
    const existedUser = await this.userModel.findOne({ _id: userId });
    if (existedUser) {
      if (bcrypt.compare(oldPassword, existedUser.password)) {
        if (newPassword === newPasswordCheck) {
          const hashedPassword = await bcrypt.hash(newPassword, 12);
          existedUser.password = hashedPassword;

          await existedUser.save();
        }
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    }
    return existedUser;
  }
}
