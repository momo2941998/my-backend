import { Schema, model, connect } from 'mongoose';
import { IUser } from './types';
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  password: String,
});

export const UserModel = model<IUser>('User', userSchema);

