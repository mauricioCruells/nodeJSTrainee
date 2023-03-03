import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  next: string[];
}
