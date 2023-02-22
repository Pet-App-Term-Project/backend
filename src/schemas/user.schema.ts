import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    unique: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;
  @Prop({
    type: String,
    required: true,
  })
  lastName: string;
  @Prop({
    type: String,
  })
  photoURL: string;
  @Prop({
    type: String,
  })
  password: string;
  @Prop({
    type: String,
    required: false,
  })
  notificationToken: string;
  @Prop({
    type: Object,
  })
  location: any;
  @Prop({ type: String })
  biography: string;
  @Prop({
    type: String,
  })
  phoneNumber: string;
}

export enum GoalsEnum {
  GENERAL = 'GENERAL',
  PEACE = 'PEACE',
  HAPPINESS = 'HAPPINESS',
  SPORT = 'SPORT',
}

export type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
