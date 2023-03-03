import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class SaveArticleDto {
  @IsUrl({
    message: `Invalid URL to save `,
  })
  @IsNotEmpty({ message: `Missing url to save, please provide one` })
  public url: string;
}
