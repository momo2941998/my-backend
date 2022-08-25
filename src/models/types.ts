import { Document } from "mongoose";
export interface IUser extends Document {
  name?: string;
  email: string;
  avatar?: string;
  password: string;
}