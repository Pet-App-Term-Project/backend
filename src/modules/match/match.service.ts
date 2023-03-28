import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { Chat, ChatDocument } from 'src/schemas/chat.schema';
import { LikeUser, LikeUserDocument } from 'src/schemas/like-user.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(LikeUser.name)
    private readonly likeUserModel: Model<LikeUserDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatDocument>,
  ) {}

  async likeUser(userId: ObjectId, likedUserId: ObjectId) {
    const user = await this.userModel.findById(userId);

    const likedUser = await this.userModel.findById(likedUserId);

    if (user && likedUser) {
      const findLike = await this.likeUserModel.find({
        user: userId,
        likedUser: likedUserId,
      });

      const findOppositeLike = await this.likeUserModel.find({
        user: likedUserId,
        likedUser: userId,
      });

      if (findLike.length === 0) {
        await this.likeUserModel.create({
          user: userId,
          likedUser: likedUserId,
        });

        console.log('findLike', findLike);

        if (findOppositeLike.length > 0) {
          const isExists = await this.chatModel
            .exists({
              $or: [
                {
                  user1: userId,
                  user2: likedUser,
                },
                {
                  user1: likedUser,
                  user2: userId,
                },
              ],
            })
            .lean();
          if (isExists) {
            return;
          } else {
            await this.chatModel.create({
              user1: userId,
              user2: likedUser,
            });

            return {
              matched: true,
              user: user,
              likedUser: likedUser,
            };
          }
        }

        return {
          liked: true,
        };
      }
    }
  }
}
