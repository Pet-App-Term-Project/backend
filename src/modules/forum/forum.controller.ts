import { Body, Controller, Delete, Post, UseGuards, Get } from '@nestjs/common';
import { Param, Put } from '@nestjs/common/decorators';
import { CurrentUser } from 'src/decorators/current-user';
import { CommentDto } from 'src/dtos/comment.dto';
import { CreateForumPostDto } from 'src/dtos/create-forum-post.dto';
import { UpdateForumPostDto } from 'src/dtos/update-forum-post.dto';
import { ObjectId, ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ForumService } from './forum.service';

@UseGuards(JwtAuthGuard)
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('create-forum-post')
  createAdvert(
    @CurrentUser() currentUser,
    @Body() createForumPostDto: CreateForumPostDto,
  ) {
    return this.forumService.createForumPost(
      currentUser._id,
      createForumPostDto,
    );
  }

  @Get('all-forum-posts')
  getAllForumPosts() {
    return this.forumService.getAllForumPosts();
  }

  @Get('get-users-all-forum-posts')
  getUsersAllForumPosts(@CurrentUser() currentUser) {
    return this.forumService.getUsersAllForumPosts(currentUser._id);
  }

  //Kategoriler yazılınca denenecek.
  @Get('get-all-forum-posts-by-category/:category')
  getAllForumPostsByCategory(@Param('category') category: string) {
    return this.forumService.getAllForumPostsByCategory(category);
  }

  @Delete('delete/:postId')
  deleteAdvert(
    @Param('postId', new ParseObjectIdPipe()) postId: ObjectId,
    @CurrentUser() currentUser,
  ) {
    return this.forumService.deleteForumPost(currentUser._id, postId);
  }

  @Get('get-comments/:postId')
  getComments(@Param('postId', new ParseObjectIdPipe()) postId: ObjectId) {
    return this.forumService.getComments(postId);
  }

  @Post('add-comment/:postId')
  addComment(
    @Param('postId', new ParseObjectIdPipe()) postId: ObjectId,
    @CurrentUser() currentUser,
    @Body() commentDto: CommentDto,
  ) {
    console.log(currentUser._id, postId, commentDto.comment);
    return this.forumService.addComment(
      postId,
      currentUser._id,
      commentDto.comment,
    );
  }

  @Put('remove-comment/:postId/:commentId')
  removeComment(
    @Param('postId', new ParseObjectIdPipe()) postId: ObjectId,
    @Param('commentId', new ParseObjectIdPipe()) commentId: ObjectId,
    @CurrentUser() currentUser,
  ) {
    return this.forumService.removeComment(currentUser._id, postId, commentId);
  }

  @Put('like-post/:postId')
  likePost(
    @Param('postId', new ParseObjectIdPipe()) postId: ObjectId,
    @CurrentUser() currentUser,
  ) {
    return this.forumService.likePost(currentUser._id, postId);
  }

  @Put('dislike-post/:postId')
  unlikePost(
    @Param('postId', new ParseObjectIdPipe()) postId: ObjectId,
    @CurrentUser() currentUser,
  ) {
    return this.forumService.dislikePost(currentUser._id, postId);
  }
}
