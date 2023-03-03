import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { RoleRepository } from '../../roles/repositories/role.repository';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly roleRepository: RoleRepository,
  ) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    const user = this.userModel
      .findOne(userFilterQuery)
      .populate('tickets')
      .select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUsers(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel
      .find(userFilterQuery)
      .populate('tickets')
      .select('-password');
  }

  async createUser(newUserInfo: CreateUserDto & Partial<User>): Promise<User> {
    if (!newUserInfo.role) {
      const defaultRole = await this.roleRepository.findOne({
        name: 'support user',
      });

      newUserInfo = {
        ...newUserInfo,
        role: defaultRole,
      };
    }
    const existing = await this.findOne({ email: newUserInfo.email });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const createdUser = new this.userModel(newUserInfo);
    return createdUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: UpdateQuery<User>,
  ): Promise<User> {
    const updatedUser = this.userModel
      .findOneAndUpdate(userFilterQuery, user, { returnDocument: 'after' })
      .populate('tickets')
      .select('-password');

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  async findOneAndDelete(userFilterQuery: FilterQuery<User>) {
    const deletedUser = await this.userModel.findOneAndDelete(userFilterQuery);

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return;
  }
}
