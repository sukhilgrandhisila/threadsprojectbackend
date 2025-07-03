import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;
}
