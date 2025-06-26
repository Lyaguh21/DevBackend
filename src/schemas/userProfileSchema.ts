import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project, ProjectSchema } from './ProjectSchema';

export type UserDocument = UserProfile & Document;

@Schema()
export class UserProfile {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  description?: string;

  @Prop()
  workplace?: string;

  @Prop({ type: [ProjectSchema], default: [] })
  portfolio: Project[];

  @Prop()
  avatar?: string;
  
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);