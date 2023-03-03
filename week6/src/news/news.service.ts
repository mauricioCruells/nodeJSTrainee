import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'src/auth/decorator/get-user.decorator';
import { QueryResult } from 'src/news/interfaces/queryResult.interface';
import { NewsGrabberService } from './news-grabber.service';
import NewsUser from 'src/users/entities/news_user.entity';
import { Repository } from 'typeorm';
import { QueryDto } from './dto/query.dto';
import { SaveArticleDto } from './dto/save-article.dto';
import Article from './entities/article.entity';

@Injectable()
export class NewsService {
  constructor(
    private newsGrabber: NewsGrabberService,
    @InjectRepository(NewsUser)
    private newsUsersRepository: Repository<NewsUser>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  findNews(query: QueryDto) {
    const response = this.newsGrabber.searchNews(query);

    return response.then((res: QueryResult[]) => {
      return { data: res };
    });
  }

  async saveNews(saveArticle: SaveArticleDto, user: Payload) {
    await this.newsUsersRepository.manager.transaction(
      async (manager) => {
        try {
          // check if article already exists and create one if not
          let article = await this.articleRepository.findOne({
            where: { url: saveArticle.url },
          });

          if (!article) {
            article = new Article();
            article.url = saveArticle.url;
            await manager.save(article);
          }

          const userToSave = await this.newsUsersRepository.findOne({
            where: { user_id: user.sub },
            relations: {
              articles: true,
            },
          });
          if (!userToSave) {
            throw new NotFoundException('user not found');
          }

          userToSave.articles.push(article);

          await manager.save(userToSave);
        } catch (error) {
          console.log(error);
        }
      },
    );

    const updatedUser = await this.newsUsersRepository.findOne({
      where: { user_id: user.sub },
      relations: {
        articles: true,
      },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      status: 'OK',
      message: 'Article saved successfully',
      savedArticles: updatedUser.articles,
    };
  }

  async getSavedNews(user: Payload) {
    const userWithArticles = await this.newsUsersRepository.findOne({
      select: {
        user_id: true,
        email: true,
        articles: true,
      },
      where: { user_id: user.sub },
      relations: {
        articles: true,
      },
    });

    return userWithArticles;
  }
}
