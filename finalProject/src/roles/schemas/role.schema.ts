import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Roles } from 'src/seeds/constants/roles.constants';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @ApiProperty({
    description: 'Defined roles to interact with all the endpoints',
    enum: Roles,
  })
  @Prop({ required: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
