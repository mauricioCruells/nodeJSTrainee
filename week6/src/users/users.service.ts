import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsUserDto } from './dto/news_user.dto';
import NewsUser from './entities/news_user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(NewsUser)
    private newsUsersRepository: Repository<NewsUser>,
  ) {}

  async findAll(): Promise<NewsUser[]> {
    return this.newsUsersRepository.find();
  }

  async findOne(id: number): Promise<NewsUser | null> {
    const user = await this.newsUsersRepository.findOneBy({
      user_id: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateOne(id: number, newsUser: NewsUserDto) {
    await this.newsUsersRepository.update(
      { user_id: id },
      { ...newsUser, updated_at: new Date() },
    );

    const updatedUser = await this.newsUsersRepository.find({
      select: {
        first_name: true,
        last_name: true,
        email: true,
      },
      where: {
        user_id: id,
      },
    });

    return {
      status: 'OK',
      message: 'Update successful',
      updatedUserInfo: {
        ...updatedUser[0],
      },
    };
  }

  async deleteOne(id: number) {
    await this.newsUsersRepository.delete(id);

    return {
      status: 'OK',
      message: 'Delete successful',
    };
  }
}
