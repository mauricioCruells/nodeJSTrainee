import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true })
  jti: string;

  @Prop({ required: true })
  _id: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
