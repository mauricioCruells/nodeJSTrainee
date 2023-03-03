import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NewsUser from './entities/news_user.entity';
import { NewsUserRepository } from './repositories/news-user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsUser])],
  providers: [UsersService, NewsUserRepository],
  controllers: [UsersController],
  exports: [NewsUserRepository],
})
export class UsersModule {}
