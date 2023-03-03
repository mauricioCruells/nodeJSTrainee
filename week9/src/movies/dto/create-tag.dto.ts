import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  public genre: string;
}
