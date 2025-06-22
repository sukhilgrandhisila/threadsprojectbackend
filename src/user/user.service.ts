import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

import { User, UserDocument } from './schemas/user.schema';
import { Document } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto) as UserDocument;
    return newUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOnebyid(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`User with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.userModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException(`User with ID ${id} not found`);
  }

  async findOne(username: string): Promise<any | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    return user || undefined;
  }
  // src/users/user.service.ts

}