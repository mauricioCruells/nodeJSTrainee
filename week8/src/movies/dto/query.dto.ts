import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsString({ each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public sort: string[];

  @IsString()
  @IsOptional()
  public title: string;

  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  public availability: number;

  @IsString({ each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public tags: string[];

  @IsNumber({ allowNaN: false }, { each: true })
  @Transform(({ value }) => {
    return value.split(',').map((movieId) => {
      return +movieId;
    });
  })
  @IsOptional()
  public movies: number[];
}
