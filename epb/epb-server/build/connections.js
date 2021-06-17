"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger/logger"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "";
const connectToDb = () => mongoose_1.default.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    logger_1.default.info("connected to database");
});
exports.connectToDb = connectToDb;
