import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { QueryDto, Source } from 'src/news/dto/query.dto';
import { NewsArticle } from './interfaces/newsArticle.interface';
import { QueryResult } from './interfaces/queryResult.interface';

@Injectable()
export class NewsFormatterService {
  public formatNews(results: AxiosResponse[], query: QueryDto) {
    const { source } = query;
    if (source === Source.TheNewYorkTimes) {
      return [this.formatNewYorkTimes(results[0])];
    } else if (source === Source.TheGuardian) {
      return [this.formatGuardian(results[0])];
    } else if (source === Source.Both) {
      return [
        this.formatNewYorkTimes(results[0]),
        this.formatGuardian(results[1]),
      ];
    }
  }

  private formatNewYorkTimes(data: any): QueryResult {
    if (data.fault) {
      return {
        source: 'The New York Times',
        status: 'BadRequest',
        numberHits: 0,
        results: data.fault.faultstring,
      };
    }
    const formattedNews: NewsArticle[] = data.response.docs.map(
      (news: any) => {
        return {
          publishDate: news.pub_date,
          type: news.document_type,
          section: news.section_name,
          title: news.headline.main,
          url: news.web_url,
          author: news.byline.person[0]
            ? `${news.byline.person[0].firstname} ${news.byline.person[0].lastname}`
            : 'Not Provided',
        };
      },
    );

    const formattedResponse = {
      source: 'The New York Times',
      status: data.status.toUpperCase(),
      numberHits: data.response.meta.hits,
      results: formattedNews,
    };

    return formattedResponse;
  }

  private formatGuardian(data: any): QueryResult {
    if (data.message) {
      return {
        source: 'The Guardian',
        status: 'BadRequest',
        numberHits: 0,
        results: data.message,
      };
    }
    const formattedNews = data.response.results.map((news: any) => {
      return {
        publishDate: news.webPublicationDate,
        type: news.type,
        section: news.sectionName,
        title: news.webTitle,
        url: news.webUrl,
        author: news.tags[0]
          ? `${news.tags[0].firstName} ${news.tags[0].lastName}`
          : 'Not Provided',
      };
    });

    const formattedResponse = {
      source: 'The Guardian',
      status: data.response.status.toUpperCase(),
      numberHits: data.response.total,
      results: formattedNews,
    };

    return formattedResponse;
  }
}
