import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsUserRepository } from 'src/users/repositories/news-user.repository';
import NewsUser from '../users/entities/news_user.entity';
import Article from './entities/article.entity';
import { NewsFormatterService } from './news-formatter.service';
import { NewsGrabberService } from './news-grabber.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { ArticleRepository } from './repositories/article.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, NewsUser]),
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [NewsController],
  providers: [
    NewsService,
    NewsGrabberService,
    NewsFormatterService,
    ArticleRepository,
    NewsUserRepository,
  ],
  exports: [ArticleRepository],
})
export class NewsModule {}
