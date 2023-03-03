import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
} from 'class-validator';

export enum Source {
  TheNewYorkTimes = 'nyt',
  TheGuardian = 'guardian',
  NewsAPI = 'newsapi',
}

export class QueryDto {
  @IsString({
    message: `Invalid search value, please make sure your q value is text`,
  })
  @IsNotEmpty({ message: `Missing search value, please provide one` })
  public q: string;

  @IsEnum(Source, {
    each: true,
    message: `source contains an invalid news source, implemented news sources are:
      'nyt' for news from The New York Times
      'guardian' for news from The Guardian
      'newsapi' for news from NewsAPI`,
  })
  @IsArray()
  @Transform(({ value }) => value.split(','))
  public source: Source[];
}
