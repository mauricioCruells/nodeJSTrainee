import { Injectable, NotFoundException } from '@nestjs/common';
import { Payload } from 'src/auth/decorator/get-user.decorator';
import NewsUser from 'src/users/entities/news_user.entity';
import { NewsUserRepository } from 'src/users/repositories/news-user.repository';
import { DataSource, Repository } from 'typeorm';
import { SaveArticleDto } from '../dto/save-article.dto';
import Article from '../entities/article.entity';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(
    private dataSource: DataSource,
    private newsUserRepository: NewsUserRepository,
  ) {
    super(Article, dataSource.createEntityManager());
  }

  async getSavedNewsByUser(user: Payload): Promise<NewsUser | null> {
    const userWithArticles = await this.newsUserRepository.findOne({
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

  async saveNewsToUser(saveArticle: SaveArticleDto, user: Payload) {
    let article = await this.findOne({
      where: { url: saveArticle.url },
    });

    if (!article) {
      article = new Article();
      article.url = saveArticle.url;
      await this.save(article);
    }

    const userToSave = await this.newsUserRepository.findOne({
      where: { user_id: user.sub },
      relations: {
        articles: true,
      },
    });

    if (!userToSave) {
      throw new NotFoundException('user not found');
    }

    userToSave.articles.push(article);

    await this.newsUserRepository.save(userToSave);

    return article;
  }
}
