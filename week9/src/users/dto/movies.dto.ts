import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MoviesDto {
  @IsNumber({ allowNaN: false }, { each: true })
  @IsNotEmpty()
  @Transform(({ value }) => {
    return value.split(',').map((movieId) => {
      return +movieId;
    });
  })
  public userId: number;
}
