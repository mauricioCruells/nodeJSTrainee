import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Ticket } from 'src/tickets/schemas/ticket.schema';
import { ApiProperty } from '@nestjs/swagger';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @ApiProperty({ description: 'Project title' })
  @Prop({ required: true, unique: true })
  title: string;

  @ApiProperty({ description: 'users' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users?: User[];

  @ApiProperty({ description: 'tickets' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tickets' }] })
  ticket?: Ticket[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
