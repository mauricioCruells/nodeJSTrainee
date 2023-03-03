import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ description: 'Project title' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
