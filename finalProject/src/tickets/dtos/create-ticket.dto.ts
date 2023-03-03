import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsEmail()
  @MinLength(5)
  email: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
