import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsUrl()
  @IsNotEmpty()
  public poster: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  public stock: number;

  @IsUrl()
  @IsNotEmpty()
  public trailer: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  public salePrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  public likes: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  public availability: number;
}
