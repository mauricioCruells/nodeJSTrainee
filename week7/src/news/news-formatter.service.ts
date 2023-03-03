import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { QueryDto, Source } from 'src/news/dto/query.dto';
import { GuardianFormatter } from './formatters/GuardianFormatter';
import { NewsAPIFormatter } from './formatters/NewsAPIFormatter';
import { NewsFormatter } from './formatters/NewsFormatter.interface';
import { NewYorkTimesFormatter } from './formatters/NewYorkTimesFormatter';

@Injectable()
export class NewsFormatterService {
  private formatters = {
    [Source.TheNewYorkTimes]: new NewYorkTimesFormatter(),
    [Source.TheGuardian]: new GuardianFormatter(),
    [Source.NewsAPI]: new NewsAPIFormatter(),
  };

  public formatNews(results: AxiosResponse[], query: QueryDto) {
    const { source } = query;

    const data = source.map((source: Source, index: number) => {
      const strategy: NewsFormatter = this.formatters[source];
      const data = results[index];
      return strategy.format(data);
    });

    return data;
  }
}
