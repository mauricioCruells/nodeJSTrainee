import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, forkJoin, catchError, of } from 'rxjs';
import { QueryDto, Source } from 'src/news/dto/query.dto';
import { NewsFormatterService } from './news-formatter.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsGrabberService {
  constructor(
    private readonly httpService: HttpService,
    private readonly newsFormatter: NewsFormatterService,
    private configService: ConfigService,
  ) {}

  private generateNYTUrl(query: string) {
    return `${this.configService.get(
      'NYT_BY_QUERY',
    )}?q=${query}&api-key=${this.configService.get('NYT_API_KEY')}`;
  }
  private generateGuardianUrl(query: string) {
    return `${this.configService.get(
      'GUARDIAN_BY_QUERY',
    )}&q=${query}&api-key=${this.configService.get(
      'GUARDIAN_API_KEY',
    )}`;
  }

  private generateNewsAPIUrl(query: string) {
    //https://newsapi.org/v2/everything?q=Apple&from=2022-12-16&apiKey=API_KEY'
    return `${this.configService.get(
      'NEWSAPI_BY_QUERY',
    )}?q=${query}&apiKey=${this.configService.get('NEWS_API_KEY')}`;
  }

  private generateNewsUrls(query: QueryDto) {
    const { q, source } = query;
    const urls: string[] = [];

    if (source === Source.TheNewYorkTimes) {
      urls.push(this.generateNYTUrl(q));
    } else if (source === Source.TheGuardian) {
      urls.push(this.generateGuardianUrl(q));
    } else if (source === Source.NewsAPI) {
      urls.push(this.generateNewsAPIUrl(q));
    } else if (source === Source.Many) {
      urls.push(
        this.generateNYTUrl(q),
        this.generateGuardianUrl(q),
        this.generateNewsAPIUrl(q),
      );
    }
    return urls;
  }

  public async searchNews(query: QueryDto) {
    const urls = this.generateNewsUrls(query);
    const requests = urls.map((url) =>
      this.httpService.get(url).pipe(
        catchError((error) => {
          return of(error.response);
        }),
      ),
    );

    let data = await firstValueFrom(forkJoin(requests));
    data = data.map((result) => result.data);

    const formattedData = this.newsFormatter.formatNews(data, query);
    return formattedData;
  }
}
