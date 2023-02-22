import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
// import { Comment, CommentSchema } from './comment.schema';
// import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class ForumPost {
  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: Array,
    ref: 'Forum',
    default: [],
  })
  // likes: Array<User>;
  @Prop({
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  // owner: User;
  @Prop({
    // type: [CommentSchema],
    default: [],
  })
  comments: mongoose.Types.Array<Comment>;

  @Prop({
    type: String,
  })
  image: string;
}

export type ForumPostDocument = ForumPost & Document;
const ForumPostSchema = SchemaFactory.createForClass(ForumPost);
export { ForumPostSchema };
