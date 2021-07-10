"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbSchema = void 0;
const codeToString_1 = require("../codeToString");
const create = __importStar(require("./createSchemaByDB"));
const logger_1 = __importDefault(require("../../logger/logger"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const read = util_1.promisify(fs_1.default.readFile);
const currentDatabase = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const isOK = yield codeToString_1.checkIfOK(path);
    if (!isOK)
        return;
    const config = JSON.parse(yield read(path, "utf8"));
    return config.database;
});
const createDbSchema = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield currentDatabase("./epb.config.json");
    logger_1.default.http(`FROM: EPB-server: creating a DB schema, database: ${res}`);
    switch (res) {
        case "mongodb":
            try {
                const res = yield create.createMongoDBSchema({
                    options: options,
                });
                return res;
            }
            catch ({ message }) {
                logger_1.default.error(`FROM: EPB-server: Error with creating a DB schema: ${message}`);
                return message;
            }
            break;
        default:
            break;
    }
    return;
});
exports.createDbSchema = createDbSchema;
