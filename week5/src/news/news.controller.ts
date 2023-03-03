import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryDto } from './dto/query.dto';
import { AllSourcesGuard } from './guards/all-sources.guard';
import { NewsService } from './news.service';

@Controller({
  path: 'news',
  version: '1',
})
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @UseGuards(AllSourcesGuard)
  async findNews(@Query() query: QueryDto): Promise<any> {
    return this.newsService.findNews(query);
  }
}
