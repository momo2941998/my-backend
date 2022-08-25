import mongoose from "mongoose";
import { mongo_uri } from "../constants";

export const connectDatabase = () => {
  return mongoose.connect(mongo_uri)
}