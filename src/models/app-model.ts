import { Schema, model } from 'mongoose';
import { IApp } from './types';
const appSchema = new Schema<IApp>({
  sid: { type: String, required: true },
  key: { type: String, required: true },
  name: { type: String, required: true },
});

export const AppModel = model<IApp>('App', appSchema);