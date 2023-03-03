import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, forkJoin, catchError, of } from 'rxjs';
import { QueryDto, Source } from 'src/news/dto/query.dto';
import { NewsFormatterService } from './news-formatter.service';

@Injectable()
export class NewsGrabberService {
  constructor(
    private readonly httpService: HttpService,
    private readonly newsFormatter: NewsFormatterService,
  ) {}

  private urlFunctions = {
    [Source.TheNewYorkTimes]: this.generateNYTUrl,
    [Source.TheGuardian]: this.generateGuardianUrl,
    [Source.NewsAPI]: this.generateNewsAPIUrl,
  };

  private generateNYTUrl(query: string) {
    return `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=Uxk2fBRAWSoGmqnyhcBKxR6zPbWEIKra`;
  }

  private generateGuardianUrl(query: string) {
    return `https://content.guardianapis.com/search?show-tags=contributor&q=${query}&api-key=3a29fda8-5d4d-4bed-a915-25136dab8927`;
  }

  private generateNewsAPIUrl(query: string) {
    return `https://newsapi.org/v2/everything?q=${query}&apiKey=a2601adfc617458885d667d2860a713a`;
  }

  private generateNewsUrls(query: QueryDto) {
    const { q, source } = query;
    const urls = source.map((source) => this.urlFunctions[source](q));
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
