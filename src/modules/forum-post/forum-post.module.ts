import { Module } from '@nestjs/common';
import { ForumPostController } from './forum-post.controller';
import { ForumPostService } from './forum-post.service';

@Module({
  controllers: [ForumPostController],
  providers: [ForumPostService]
})
export class ForumPostModule {}
