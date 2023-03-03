import { QueryResult } from '../interfaces/queryResult.interface';
import { NewsFormatter } from './NewsFormatter.interface';

export class NewsAPIFormatter implements NewsFormatter {
  format(data: any): QueryResult {
    if (data.message) {
      return {
        source: 'NewsAPI',
        status: 'BadRequest',
        numberHits: 0,
        results: data.message,
      };
    }
    const formattedNews = data.articles.map((news: any) => {
      return {
        publishDate: news.publishedAt,
        type: 'article',
        section: 'article',
        title: news.title,
        url: news.url,
        author: news.author,
      };
    });

    const truncatedFormattedNews = formattedNews.slice(0, 10);
    const formattedResponse = {
      source: 'NewsAPI',
      status: data.status.toUpperCase(),
      numberHits: data.totalResults,
      results: truncatedFormattedNews,
    };

    return formattedResponse;
  }
}
