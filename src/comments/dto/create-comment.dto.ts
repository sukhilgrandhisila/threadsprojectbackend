import { IsNotEmpty, IsOptional, IsMongoId, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
  @ApiProperty({
    description: 'The text of the comment',
    example: 'This is a comment',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'The user id of the comment',
    example: '123',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The parent id of the comment',
    example: '123',
  })
  @IsMongoId()
  @IsOptional()
  parentId: string | null;

  @ApiProperty({
    description: 'The likes of the comment',
    example: 10,
  })
  @IsNumber()
  likes?: number;
}

