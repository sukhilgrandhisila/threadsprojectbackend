import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @Get()
  findAll(@Query('parentId') parentId?: string) {
    return this.commentsService.findAll(parentId);
  }

  @Get(':id/comments')
  findByParent(@Param('id') id: string) {
    return this.commentsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
  @Post(':id/like')
  async likeComment(@Param('id') id: string) {
    return this.commentsService.likeComment(id);
  }
}
