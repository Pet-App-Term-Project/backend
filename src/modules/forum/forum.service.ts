import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateForumPostDto } from 'src/dtos/create-forum-post.dto';
import { UpdateForumPostDto } from 'src/dtos/update-forum-post.dto';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { Forum, ForumDocument } from 'src/schemas/forum.schema';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(Forum.name)
    private readonly forumModel: Model<ForumDocument>,
  ) {}

  async createForumPost(
    userId: ObjectId,
    createForumPostDto: CreateForumPostDto,
  ) {
    const forum = new this.forumModel({
      ...createForumPostDto,
      user: userId,
    });
    return forum.save();
  }

  getAllForumPosts() {
    return this.forumModel.find().populate('user').sort({ createdAt: -1 });
  }

  getUsersAllForumPosts(userId: ObjectId) {
    return this.forumModel
      .find({ user: userId })
      .populate('user')
      .sort({ createdAt: -1 });
  }

  //Kategoriler yazılınca denenecek
  getAllForumPostsByCategory(category: string) {
    return this.forumModel
      .find({ categories: category })
      .populate('user')
      .sort({ createdAt: -1 });
  }

  //Test edilecek.
  async deleteForumPost(userId: ObjectId, postId: ObjectId) {
    const advert = await this.forumModel
      .findOne({
        _id: postId,
      })
      .lean();
    if (!advert) {
      throw new Error('Post not found');
    }
    if (advert.user.toString() !== userId.toString()) {
      throw new Error('You are not the owner of this post');
    }
    await this.forumModel.deleteOne({
      _id: postId,
    });
    return {
      message: 'Post deleted',
    };
  }
}
