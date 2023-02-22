import { Injectable } from '@nestjs/common';

//Servis baştan yazılacak
@Injectable()
export class ForumPostService {
  constructor(
    @InjectModel(UserPost.name)
    private readonly userPostModel: Model<UserPostDocument>,
    private readonly websocketGateway: AppGateway,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly media: MediaService,
  ) {}

  getAllPosts() {
    return this.userPostModel.find().populate('owner').sort({ createdAt: -1 });
  }
}
