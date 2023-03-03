import { IsString } from 'class-validator';

export class CommentDTO {
  @IsString()
  text: string;

  createdAt: Date;
}
