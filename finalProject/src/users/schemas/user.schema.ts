import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';
import { Role } from '../../roles/schemas/role.schema';
import { Ticket } from '../../tickets/schemas/ticket.schema';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ description: 'User id', type: 'string' })
  _id?: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ description: 'User first name', type: 'string' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'User last name', type: 'string' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ description: 'User email', type: 'string' })
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'User roles', type: Role })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true })
  role: Role;

  @ApiProperty({ description: 'Date the user was created', type: 'string' })
  @Prop({ default: now() })
  createdAt: Date;

  @ApiProperty({
    description: 'Tickets the user currently has assigned',
    type: Ticket,
    isArray: true,
  })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    default: [],
  })
  tickets: Ticket[];
}

export const UserSchema = SchemaFactory.createForClass(User);
