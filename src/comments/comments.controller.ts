import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Req() req: any) {
    const comment = await this.commentsService.findById(id);
    console.log(comment);
    if (!comment) {
      throw new NotFoundException('Comment not found');
      
    }
  
    const isOwner = comment.user.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
  
    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You are not allowed to delete this comment');
      
    }
  
    return this.commentsService.remove(id);
  }
  
  @Post(':id/like')
  async likeComment(@Param('id') id: string) {
    return this.commentsService.likeComment(id);
  }
}
