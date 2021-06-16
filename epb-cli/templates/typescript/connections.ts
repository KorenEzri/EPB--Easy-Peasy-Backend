import dotenv from "dotenv";
import mongoose from "mongoose";
import Logger from "./logger/logger";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
export const connectToDb = () =>
  mongoose.connect(
    MONGO_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      Logger.info("connected to database");
    }
  );
