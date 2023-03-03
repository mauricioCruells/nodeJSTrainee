import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import NewsUser from './entities/news_user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsUser])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
