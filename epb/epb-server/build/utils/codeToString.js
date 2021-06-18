"use strict";
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
exports.getActions = exports.getTypeDefs = exports.getResolvers = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../logger/logger"));
const util_1 = require("util");
const read = util_1.promisify(fs_1.default.readFile);
const access = util_1.promisify(fs_1.default.access);
const getActionOnly = new RegExp(/; \/\/ Action: \w+.*/g);
const getWholeResolver = new RegExp(/await \w+.*/g);
const getResolvers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield access("./resolvers.ts", fs_1.default.constants.R_OK);
    }
    catch ({ message }) {
        logger_1.default.error(`Could not locate resolvers file, ${message}`);
    }
    logger_1.default.info("Sending resolvers as string..");
    return yield read("./resolvers.ts", "utf8");
});
exports.getResolvers = getResolvers;
const getTypeDefs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield access("./typeDefs.ts", fs_1.default.constants.R_OK);
    }
    catch ({ message }) {
        logger_1.default.error(`Could not locate resolvers file, ${message}`);
    }
    logger_1.default.info("Sending typeDefs as string..");
    return yield read("./typeDefs.ts", "utf8");
});
exports.getTypeDefs = getTypeDefs;
const getActions = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resolvers = yield exports.getResolvers();
    if (!resolvers)
        return;
    return (_a = resolvers
        .split("Query:")[1]
        .match(getActionOnly)) === null || _a === void 0 ? void 0 : _a.map((action) => {
        const parsedAction = action.split("//")[1].trim();
        const actionAction = parsedAction.split("Action: ")[1];
        return actionAction.charAt(0).toUpperCase() + actionAction.slice(1);
    });
});
exports.getActions = getActions;
