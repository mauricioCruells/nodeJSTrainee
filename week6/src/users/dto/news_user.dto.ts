import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NewsUserDto {
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
