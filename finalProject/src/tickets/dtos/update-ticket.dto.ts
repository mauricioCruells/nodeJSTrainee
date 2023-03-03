import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment: Record<string, any>;
}
