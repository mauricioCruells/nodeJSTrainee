import { QueryResult } from '../interfaces/queryResult.interface';
import { NewsFormatter } from './NewsFormatter.interface';

export class GuardianFormatter implements NewsFormatter {
  format(data: any): QueryResult {
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
