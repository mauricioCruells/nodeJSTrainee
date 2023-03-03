import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document, now } from 'mongoose';
import { CommentSchema } from './comment.schema';
import { Comment } from './comment.schema';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @ApiProperty({ description: 'Email from regular user', type: 'string' })
  @ApiProperty({ description: 'Email from regular user', type: 'string' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'Title for request', type: 'string' })
  @ApiProperty({ description: 'Title for request', type: 'string' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Details about the issue', type: 'string' })
  @ApiProperty({ description: 'Details about the issue', type: 'string' })
  @Prop({ required: true })
  description: string;

  @Prop({
    type: String,
    ref: 'Status',
  })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  assignedTo: string;

  @Prop([CommentSchema])
  comments: Comment[];

  @ApiProperty({ description: 'Ticket creation date' })
  @ApiProperty({ description: 'Ticket creation date' })
  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @ApiProperty({ description: 'Ticket last update' })
  @ApiProperty({ description: 'Ticket last update' })
  @Prop({ type: Date, default: now() })
  updatedAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
