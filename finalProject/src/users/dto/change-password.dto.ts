import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ description: 'validation for new password', type: 'string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
