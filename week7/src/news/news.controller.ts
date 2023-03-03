import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  GetUser,
  Payload,
} from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { QueryDto } from './dto/query.dto';
import { SaveArticleDto } from './dto/save-article.dto';
import { NewsService } from './news.service';

@Controller({
  path: 'news',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  async findNews(@Query() query: QueryDto) {
    return this.newsService.findNews(query);
  }

  @Post('save')
  async saveNews(
    @Body() saveArticle: SaveArticleDto,
    @GetUser() user: Payload,
  ) {
    return this.newsService.saveNews(saveArticle, user);
  }

  @Get('mysaved')
  async getSavedNews(@GetUser() user: Payload) {
    return this.newsService.getSavedNews(user);
  }
}
