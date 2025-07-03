import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginInterceptor } from 'src/login/login.interceptor';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user Routes')
@Controller('users')
@UseInterceptors(LoginInterceptor)
export class UsersController {
  constructor(private readonly usersService: UserService) {}
  @ApiOperation({ summary: 'Create a new user' ,description: 'Create a new user with the given username, password and email' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('post create');
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({ summary: 'Get all users' ,description: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by id' ,description: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'User fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOnebyid(id);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a user by id' ,description: 'Update a user by id' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a user by id' ,description: 'Delete a user by id' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
@Delete(':id')
async remove(@Param('id') id: string, @Req() req: any) {
  const isAdmin = await this.usersService.isAdmin(req.user.userId);
  if (!isAdmin) {
    throw new ForbiddenException('You are not allowed to delete this user');
  }

  return this.usersService.remove(id, req.user);
}

}