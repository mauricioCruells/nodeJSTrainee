import { Injectable } from '@nestjs/common';
import { NewsUserDto } from './dto/news_user.dto';
import { NewsUserRepository } from './repositories/news-user.repository';

@Injectable()
export class UsersService {
  constructor(private newsUserRepository: NewsUserRepository) {}

  async findAll() {
    const users = await this.newsUserRepository.findAllUsers();
    return {
      status: 'OK',
      message: 'successfully found all users',
      data: users,
    };
  }

  async findOne(id: number) {
    const user = await this.newsUserRepository.findOneUser(id);
    return {
      status: 'OK',
      message: 'successfully found user',
      data: [user],
    };
  }

  async updateOne(id: number, newsUser: NewsUserDto) {
    const updatedUser = await this.newsUserRepository.updateOneUser(
      id,
      newsUser,
    );

    return {
      status: 'OK',
      message: 'successfully updated user',
      data: [updatedUser],
    };
  }

  async deleteOne(id: number) {
    await this.newsUserRepository.deleteOneUser(id);

    return {
      status: 'OK',
      message: 'Delete successful',
    };
  }
}
