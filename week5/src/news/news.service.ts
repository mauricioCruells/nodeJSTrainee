import { Injectable } from '@nestjs/common';
import { QueryResult } from 'src/news-grabber/interfaces/queryResult.interface';
import { NewsGrabberService } from 'src/news-grabber/news-grabber.service';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class NewsService {
  constructor(private newsGrabber: NewsGrabberService) {}

  findNews(query: QueryDto) {
    const response = this.newsGrabber.searchNews(query);

    return response.then((res: QueryResult[]) => {
      return { data: res };
    });
  }
}
