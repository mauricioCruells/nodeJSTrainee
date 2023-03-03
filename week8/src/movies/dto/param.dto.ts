import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MovieParamDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  public movieId: number;
}

export class TagParamDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  public tagId: number;
}
