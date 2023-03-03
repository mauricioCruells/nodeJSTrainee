import { Injectable } from '@nestjs/common';
import { Payload } from 'src/auth/decorator/get-user.decorator';
import { NewsGrabberService } from './news-grabber.service';
import { QueryDto } from './dto/query.dto';
import { SaveArticleDto } from './dto/save-article.dto';
import { ArticleRepository } from './repositories/article.repository';

@Injectable()
export class NewsService {
  constructor(
    private newsGrabber: NewsGrabberService,
    private articleRepository: ArticleRepository,
  ) {}

  async findNews(query: QueryDto) {
    const response = await this.newsGrabber.searchNews(query);

    return {
      status: 'OK',
      message: 'successfully found queried news',
      data: response,
    };
  }

  async saveNews(saveArticle: SaveArticleDto, user: Payload) {
    const savedArticle = await this.articleRepository.saveNewsToUser(
      saveArticle,
      user,
    );

    return {
      status: 'OK',
      message: 'Article saved successfully',
      data: [savedArticle],
    };
  }

  async getSavedNews(user: Payload) {
    const savedNews = await this.articleRepository.getSavedNewsByUser(
      user,
    );

    return {
      status: 'OK',
      message: 'articles by user retrieved successfully',
      data: [savedNews],
    };
  }
}
