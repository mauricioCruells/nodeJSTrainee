import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    return `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${this.configService.get(
      'NYT_API_KEY',
    )}`;
  }
  private generateGuardianUrl(query: string) {
    return `https://content.guardianapis.com/search?show-tags=contributor&q=${query}&api-key=${this.configService.get(
      'GUARDIAN_API_KEY',
    )}`;
  }

  private generateNewsUrls(query: QueryDto) {
    const { q, source } = query;
    const urls: string[] = [];

    if (source === Source.TheNewYorkTimes) {
      urls.push(this.generateNYTUrl(q));
    } else if (source === Source.TheGuardian) {
      urls.push(this.generateGuardianUrl(q));
    } else if (source === Source.Both) {
      urls.push(this.generateNYTUrl(q), this.generateGuardianUrl(q));
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
