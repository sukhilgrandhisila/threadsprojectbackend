import { IsString,IsEmail, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString()
  username: string;
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  password:string;
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsEmail()
  email:string;
  
}
