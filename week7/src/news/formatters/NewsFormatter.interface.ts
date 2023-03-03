import { QueryResult } from '../interfaces/queryResult.interface';

export interface NewsFormatter {
  format(data: any): QueryResult;
}
