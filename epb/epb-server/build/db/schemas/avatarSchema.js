"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const avatarSchema = new mongoose_1.default.Schema({
    id: { type: String, unique: true },
    kaki: { type: Number, unique: true },
    amount: Array,
});
avatarSchema.plugin(mongoose_unique_validator_1.default);
avatarSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.avatarModel = mongoose_1.default.model("avatarModel", avatarSchema);
// asdasda
