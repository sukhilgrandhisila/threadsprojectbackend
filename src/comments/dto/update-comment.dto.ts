import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    description: 'The text of the comment',
    example: 'This is a comment',
  })
  text: string;
  @ApiProperty({
    description: 'The user id of the comment',
    example: '123',
  })
  userId: string;
  @ApiProperty({
    description: 'The parent id of the comment',
    example: '123',
  })
  parentId: string;
  @ApiProperty({
    description: 'The likes of the comment',
    example: 10,
  })
    likes: number;
}
