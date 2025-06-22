import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(dto: CreateCommentDto) {
    const comment = new this.commentModel({
      text: dto.text,
      user: dto.userId,
      parent: dto.parentId || null,
    });

    return comment.save().then((doc)=>{
      return doc.populate(['user','parent']);
    })
  }

  async findAll(parentId?: string) {
    const filter = parentId ? { parent: parentId } : { parent: null };
    return this.commentModel.find(filter).populate('user', 'name').populate('parent');
  }

  async findById(id: string) {
    const comment = await this.commentModel.findById(id).populate('user', 'name').populate('parent');
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto) {
    const updated = await this.commentModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Comment not found');
    return (await updated.populate('user', 'name')).populate('parent');
  }

  async remove(id: string) {
    const deleted = await this.commentModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Comment not found');
    return { message: 'Comment deleted' };
  }
  async likeComment(id: string) {
    return this.commentModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  }
}
