import { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  app_sid: string;
}

export interface IApp extends Document {
  name: string;
  sid: string;
  key: string;
}