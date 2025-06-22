import { IsNotEmpty, IsOptional, IsMongoId, IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  userId: string;

  @IsMongoId()
  @IsOptional()
  parentId: string | null;

  @IsNumber()
  likes?: number;
}

