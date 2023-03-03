import { Injectable, NotFoundException } from '@nestjs/common';
import { SignInDto } from 'src/auth/dto/sigin.dto';
import { UserRepository } from '../users/repositories/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAllUsers();
  }

  async findOne(userInfo: number | string | SignInDto) {
    let user: User;
    if (typeof userInfo === 'number') {
      user = await this.userRepository.findOneUser(userInfo);
    } else if (typeof userInfo === 'string') {
      user = await this.userRepository.findOneUserByEmail(userInfo);
    } else {
      user = await this.userRepository.findOneUserByUsername(
        userInfo.username,
      );
    }

    if (!user) {
      throw new NotFoundException(
        `user with info: ${userInfo} not found`,
      );
    }

    return user;
  }

  async update(userId: number, updatedUserInfo: UpdateUserDto) {
    const user = await this.findOne(userId);

    await this.userRepository.updateOneUser(user, updatedUserInfo);

    return { userId, update: { ...updatedUserInfo } };
  }

  async remove(userId: number) {
    const deletedUser = await this.userRepository.deleteOneUser(
      userId,
    );

    if (deletedUser.affected === 0) {
      throw new NotFoundException(
        `user with id: ${userId} not found`,
      );
    }
  }
}
