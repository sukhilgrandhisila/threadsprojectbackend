import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';


export type CommentDocument = HydratedDocument<Comment>;


@Schema({timestamps:true})
export class Comment {
  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  parent: Comment | null;

  @Prop({default:0,type:Number})
  likes?: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);