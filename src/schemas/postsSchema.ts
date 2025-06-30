import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ required: true, enum: ['Content', 'Event', 'Vacancy'] })
  type: string;

  @Prop({ required: true })
  direction: string;

  @Prop({ required: true, default: 0 })
  likes: Number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  likedBy: Types.ObjectId[];

  @Prop({ default: '' })
  previewImage: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
