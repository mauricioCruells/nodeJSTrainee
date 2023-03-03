import { ObjectId } from 'mongoose';

export interface UserPayload {
  _id: ObjectId;
  email: string;
  role?: string;
}
