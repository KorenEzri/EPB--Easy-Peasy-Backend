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
exports.getResolverNames = exports.getActions = exports.getTypeDefs = exports.getResolvers = exports.checkIfOK = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../logger/logger"));
const util_1 = require("util");
const resolvers_1 = require("../resolvers");
const read = util_1.promisify(fs_1.default.readFile);
const readDir = util_1.promisify(fs_1.default.readdir);
const access = util_1.promisify(fs_1.default.access);
const getActionOnly = new RegExp(/\/\/ Action: \w+.*/g);
const checkIfOK = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield access(path, fs_1.default.constants.R_OK);
        return "OK";
    }
    catch ({ message }) {
        logger_1.default.error(`Could not locate ${path} file, ${message}`);
    }
});
exports.checkIfOK = checkIfOK;
const getResolvers = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield exports.checkIfOK("./resolvers.ts")))
        return;
    return yield read("./resolvers.ts", "utf8");
});
exports.getResolvers = getResolvers;
const getTypeDefs = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield exports.checkIfOK("./typeDefs.ts")))
        return;
    return yield read("./typeDefs.ts", "utf8");
});
exports.getTypeDefs = getTypeDefs;
const getActions = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resolvers = yield exports.getResolvers();
    if (!resolvers)
        return;
    return (_a = resolvers.match(getActionOnly)) === null || _a === void 0 ? void 0 : _a.map((action) => {
        const parsedAction = action.split("//")[1].trim();
        const actionAction = parsedAction.split("Action: ")[1];
        return actionAction.charAt(0).toUpperCase() + actionAction.slice(1);
    });
});
exports.getActions = getActions;
let interval;
const getResolverNames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutations = Object.keys(resolvers_1.resolvers.Mutation);
        const queries = Object.keys(resolvers_1.resolvers.Query);
        const allTypes = yield readDir("./types");
        clearInterval(interval);
        return mutations.concat(queries.concat(allTypes));
    }
    catch ({ message }) {
        interval = setInterval(() => {
            exports.getResolverNames();
        }, 300);
    }
});
exports.getResolverNames = getResolverNames;
