import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NewsUserDto } from '../dto/news_user.dto';
import NewsUser from '../entities/news_user.entity';

@Injectable()
export class NewsUserRepository extends Repository<NewsUser> {
  constructor(private dataSource: DataSource) {
    super(NewsUser, dataSource.createEntityManager());
  }

  async findAllUsers(): Promise<NewsUser[]> {
    return this.find();
  }

  async findOneUser(id: number): Promise<NewsUser> {
    const user = await this.findOneBy({
      user_id: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateOneUser(id: number, newsUser: NewsUserDto) {
    await this.update(
      { user_id: id },
      { ...newsUser, updated_at: new Date() },
    );

    const updatedUser = await this.findOne({
      select: {
        first_name: true,
        last_name: true,
        email: true,
      },
      where: {
        user_id: id,
      },
    });
    return updatedUser;
  }

  async deleteOneUser(id: number) {
    const user = await this.delete(id);
    console.log(user);
    if (user.affected === 0) {
      throw new NotFoundException('user not found');
    }
  }
}
