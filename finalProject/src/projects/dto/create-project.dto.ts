import { IsNotEmpty, IsString } from 'class-validator';
import { Ticket } from '../../tickets/schemas/ticket.schema';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'support users assigned to project' })
  users?: User[];

  @ApiProperty({ description: 'tickets assigned to project' })
  ticket?: Ticket[];
}
