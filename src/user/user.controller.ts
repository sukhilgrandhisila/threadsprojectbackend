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
import { LoggingInterceptor } from 'src/login/login.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('post create');
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOnebyid(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
@Delete(':id')
async remove(@Param('id') id: string, @Req() req: any) {
  const isAdmin = await this.usersService.isAdmin(req.user.userId);
  if (!isAdmin) {
    throw new ForbiddenException('You are not allowed to delete this user');
  }

  return this.usersService.remove(id, req.user);
}

}