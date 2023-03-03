import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: "New user's first name" })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: "New user's last name" })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({ description: "New user's email" })
  @IsString()
  @IsEmail()
  @MinLength(5)
  email: string;
}
