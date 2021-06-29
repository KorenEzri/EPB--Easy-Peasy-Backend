"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const messageSchema = new mongoose_1.default.Schema({
    sender: String,
    time: Date,
    followers: Array,
    content: String,
    likes: Number,
});
messageSchema.plugin(mongoose_unique_validator_1.default);
messageSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.messageModel = mongoose_1.default.model("messageModel", messageSchema);
//
