import { NewsArticle } from '../interfaces/newsArticle.interface';
import { QueryResult } from '../interfaces/queryResult.interface';
import { NewsFormatter } from './NewsFormatter.interface';

export class NewYorkTimesFormatter implements NewsFormatter {
  format(data: any): QueryResult {
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
}
