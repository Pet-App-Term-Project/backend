import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeUserInformationDto } from 'src/dtos/change-user-informations.dto';
import { UpdateUserPasswordDto } from 'src/dtos/update-user-password.dto';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { Advert, AdvertDocument } from 'src/schemas/advert.schema';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
    @InjectModel(Advert.name)
    private readonly advertModel: Model<AdvertDocument>,
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
  async createChat(userId: ObjectId, friendId: ObjectId) {
    const isExists = await this.chatModel
      .exists({
        $or: [
          {
            user1: userId,
            user2: friendId,
          },
          {
            user1: friendId,
            user2: userId,
          },
        ],
      })
      .lean();
    if (isExists) {
      return;
    } else {
      return this.chatModel.create({
        user1: userId,
        user2: friendId,
      });
    }
  }
  async sendMessage(userId: ObjectId, receipent: ObjectId, message: string) {
    const chat = await this.chatModel
      .findOne({
        $or: [
          {
            user1: userId,
            user2: receipent,
          },
          {
            user1: receipent,
            user2: userId,
          },
        ],
      })
      .lean();
    const user = await this.userModel.findById(userId);
    const receipentUser = await this.userModel.findById(receipent);
    if (!chat) {
      throw new BadRequestException('Chat not found');
    }
    await this.chatModel
      .findOneAndUpdate(
        {
          $or: [
            {
              user1: chat.user1,
              user2: chat.user2,
            },
            {
              user1: chat.user2,
              user2: chat.user1,
            },
          ],
        },
        {
          $push: {
            messages: {
              _id: Math.round(Math.random() * 1000000),
              text: message,
              user: {
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
              },
            },
          },
        },
        { new: true },
      )
      .lean();
  }
  async listMessages(userId: ObjectId, friendId: ObjectId) {
    const chat = await this.chatModel
      .findOne({
        $or: [
          {
            user1: userId,
            user2: friendId,
          },
          {
            user1: friendId,
            user2: userId,
          },
        ],
      })
      .lean();
    if (!chat) {
      throw new BadRequestException('Chat not found');
    }
    const filterMessages = chat.messages.filter((item) => item);
    return filterMessages;
  }

  async getUserData(userId: ObjectId) {
    const User = await this.userModel.findOne({ _id: userId });
    const advert = await this.userModel.findOne({ user: userId });
    return { User, advert };
  }
}
