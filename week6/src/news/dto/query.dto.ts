import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export enum Source {
  TheNewYorkTimes = 'nyt',
  TheGuardian = 'guardian',
  NewsAPI = 'newsapi',
  Many = 'many',
}

export class QueryDto {
  @IsString({
    message: `Invalid search value, please make sure your q value is text`,
  })
  @IsNotEmpty({ message: `Missing search value, please provide one` })
  public q: string;

  @IsEnum(Source, {
    message: `Invalid or missing source value, make sure to include source= with your query
    valid values: 
    'nyt' for news from The New York Times
    'guardian' for news from The Guardian
    'both' for news from both sources`,
  })
  public source: Source;
}
