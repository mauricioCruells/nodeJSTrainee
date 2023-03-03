import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export interface StatusDocument extends Document {
  name: string;
  nextStatuses: string[];
}

@Schema({
  collection: 'Statuses',
})
export class Status {
  @ApiProperty({ description: 'Name of the status' })
  @Prop({ required: true })
  name: string;
  @ApiProperty({ description: 'Next available statuses' })
  @Prop({ required: true, type: [String], ref: 'Status' })
  nextStatuses: string[];
}

export const StatusSchema = SchemaFactory.createForClass(Status);
