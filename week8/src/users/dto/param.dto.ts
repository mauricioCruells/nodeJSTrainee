import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ParamDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  public userId: number;
}
