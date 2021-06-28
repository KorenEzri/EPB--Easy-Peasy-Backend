"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JumanjeeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const JumanjeeSchema = new mongoose_1.default.Schema({
    amount: { type: number, unique: true },
});
JumanjeeSchema.plugin(mongoose_unique_validator_1.default);
JumanjeeSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.JumanjeeModel = mongoose_1.default.model("JumanjeeModel", JumanjeeSchema);
//
