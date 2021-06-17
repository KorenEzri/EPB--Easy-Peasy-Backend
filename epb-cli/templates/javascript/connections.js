const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Logger } = require("./logger/logger");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
const connectToDb = () =>
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

module.exports = { connectToDb };
