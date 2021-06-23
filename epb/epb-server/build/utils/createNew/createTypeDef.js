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
exports.createNewTypeOnly = exports.createNewTypeDef = void 0;
const utils = __importStar(require("./string.util"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const codeToString_1 = require("../codeToString");
const logger_1 = __importDefault(require("../../logger/logger"));
const write = util_1.promisify(fs_1.default.writeFile);
let typeDefInterface = {};
const toTypeDef = ({ options }) => {
    const { name, returnType, properties } = options;
    let varList;
    varList = utils.compileToVarList(properties);
    if (properties.length < 3) {
        varList = varList.map((variable) => {
            return `${variable.var}:${utils.capitalizeFirstLetter(variable.type)}`;
        });
    }
    else {
        varList.forEach((variable) => {
            typeDefInterface[variable.var] = utils.capitalizeFirstLetter(variable.type.trim());
        });
        varList = `options: ${name}Options`;
    }
    let typeDef;
    properties.length
        ? (typeDef = `${name}(${varList}): ${utils.capitalizeFirstLetter(returnType)}`)
        : (typeDef = `${name}: ${utils.capitalizeFirstLetter(returnType)}
    `);
    return typeDef;
};
const insertTypeDef = (splatTypeDefs, name, type) => {
    let interfacePreFix;
    type === "query" ? (interfacePreFix = "type") : (interfacePreFix = "input");
    if (!Object.values(typeDefInterface).length)
        return splatTypeDefs;
    const index = splatTypeDefs.indexOf("# generated definitions");
    const interfaceString = `\n ${interfacePreFix} ${name}Options ${JSON.stringify(typeDefInterface, null, 2)}\n# added at: ${new Date()}`;
    let finishedInterfaceDef = utils.replaceAllInString(interfaceString, '"', "");
    splatTypeDefs.splice(index + 1, 0, finishedInterfaceDef);
    return splatTypeDefs;
};
const createNewTypeDef = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new type definition...");
    // compile a type definition string from options
    const fullTypeDef = toTypeDef({ options: options });
    const typeDefs = yield codeToString_1.getTypeDefs(); // current typeDef file as string
    if (!typeDefs)
        return "ERROR";
    const splatTypeDefs = typeDefs.split("\n").map((line) => line.trim());
    let indexToPush; // The index (line number) in which the next typeDef is meant to enter.
    options.type.toLowerCase() === "mutation" // mutation or query? different line number
        ? (indexToPush = splatTypeDefs.indexOf("# mutation-end"))
        : (indexToPush = splatTypeDefs.indexOf("# query-end"));
    // push into line indexToPush the compiled typeDef.
    if (!splatTypeDefs.includes(fullTypeDef))
        splatTypeDefs.splice(indexToPush, 0, fullTypeDef);
    // insert input type / query type (interface) into typeDefs if needed
    let revisedTypeDefs = insertTypeDef(splatTypeDefs, options.name, options.type).join("\n");
    revisedTypeDefs = utils.replaceAllInString(revisedTypeDefs, "Number", "Int");
    yield write("./typeDefs.ts", revisedTypeDefs);
});
exports.createNewTypeDef = createNewTypeDef;
const createNewTypeOnly = (options) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createNewTypeOnly = createNewTypeOnly;
