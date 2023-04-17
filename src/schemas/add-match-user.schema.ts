/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class AddMatchUser {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: Array,
    required: true,
  })
  photoURL: Array<string>;

  @Prop({
    type: Object,
    required: true,
  })
  location: object;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  age: string;

  @Prop({
    type: String,
    required: true,
  })
  breed: string;

  @Prop({
    type: String,
    required: true,
  })
  species: string;
}

export type AddMatchUserDocument = AddMatchUser & Document;

const AddMatchUserSchema = SchemaFactory.createForClass(AddMatchUser);

export { AddMatchUserSchema };
