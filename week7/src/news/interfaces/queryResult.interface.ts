import { NewsArticle } from './newsArticle.interface';

export interface QueryResult {
  source: string;
  status: string;
  numberHits: number;
  results: NewsArticle[];
}
