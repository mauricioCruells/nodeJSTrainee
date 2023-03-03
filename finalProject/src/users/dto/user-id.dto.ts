import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class UserIdDto {
  @ApiProperty({ description: 'User Id', type: 'string' })
  @IsObjectId()
  userId: string;
}
