import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    username: string;
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
