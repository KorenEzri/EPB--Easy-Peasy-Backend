"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const movieSchema = new mongoose_1.default.Schema({
    actors: Array,
    duration: Number,
    name: { type: String, unique: true },
    views: Number,
});
movieSchema.plugin(mongoose_unique_validator_1.default);
movieSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    },
});
exports.MovieModel = mongoose_1.default.model("MovieModel", movieSchema);
//
