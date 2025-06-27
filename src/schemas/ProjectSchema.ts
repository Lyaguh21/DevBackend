import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ _id: true, timestamps: false, versionKey: false })
export class Project {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  links: string[];

  @Prop()
  previewImage?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);