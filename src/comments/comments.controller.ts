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
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('comments Routes')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create a new comment' ,description: 'Create a new comment with the given content and parentId' })
  @ApiResponse({ status: 201, description: 'Comment created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateCommentDto })
  @Post('create')
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @ApiOperation({ summary: 'Get all comments' ,description: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'Comments fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Comments not found' })
  @Get()
  findAll(@Query('parentId') parentId?: string) {
    return this.commentsService.findAll(parentId);
  }

  @ApiOperation({ summary: 'Get comments by parentId' ,description: 'Get comments by parentId' })
  @ApiResponse({ status: 200, description: 'Comments fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Comments not found' })
  @Get(':id/comments')
  findByParent(@Param('id') id: string) {
    return this.commentsService.findAll(id);
  }

  @ApiOperation({ summary: 'Get a comment by id' ,description: 'Get a comment by id' })
  @ApiResponse({ status: 200, description: 'Comment fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findById(id);
  }

  @ApiOperation({ summary: 'Update a comment by id' ,description: 'Update a comment by id' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiBody({ type: UpdateCommentDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(id, dto);
  }
  @ApiOperation({ summary: 'Delete a comment by id' ,description: 'Delete a comment by id' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Like a comment by id' ,description: 'Like a comment by id' })
  @ApiResponse({ status: 200, description: 'Comment liked successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiBearerAuth()
  @Post(':id/like')
  @UseGuards(AuthGuard)
  @Post(':id/like')
  async likeComment(@Param('id') id: string) {
    return this.commentsService.likeComment(id);
  }
}
