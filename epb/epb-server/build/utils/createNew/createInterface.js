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
exports.createNewInterface = exports.insert_Into_Types_Index_TS = void 0;
const logger_1 = __importDefault(require("../../logger/logger"));
const codeToString_1 = require("../codeToString");
const utils = __importStar(require("./string.util"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
const insert_Into_Types_Index_TS = (exportStatement) => __awaiter(void 0, void 0, void 0, function* () {
    const typeIndexPath = "./types/index.ts";
    try {
        const isOK = yield codeToString_1.checkIfOK(typeIndexPath);
        if (!isOK)
            return "ERROR";
        const typeIndexFile = yield read(typeIndexPath, "utf8");
        try {
            const assorted = typeIndexFile.split("\n");
            if (!assorted.includes(exportStatement)) {
                assorted.push(exportStatement);
                yield write(typeIndexPath, assorted.join("\n"));
                return "OK";
            }
            else {
                return "Export statement already exists, please update the interface's file instead.";
            }
        }
        catch ({ message }) {
            logger_1.default.error(message);
            return "ERROR";
        }
    }
    catch ({ message }) {
        logger_1.default.error(message);
        return "ERROR";
    }
});
exports.insert_Into_Types_Index_TS = insert_Into_Types_Index_TS;
const toInterface = ({ options }) => {
    let interfaceString = {};
    let varList;
    const { properties, name } = options;
    varList = utils.compileToVarList(properties);
    interfaceString.options = {};
    varList.forEach((variable) => {
        const lowerCaseVar = utils.fixTypes(variable);
        interfaceString.options[variable.var] = lowerCaseVar;
    });
    varList = `{ options }:${name}Options`;
    interfaceString = `// imports section \n\n//\n\n// imports section end\n\nexport interface ${name}Options ${JSON.stringify(interfaceString, null, 2)}\n// added at: ${new Date()} \n\n// exports section\n\n// exports section end`;
    return interfaceString;
};
const insertInterface = (name, interfaceString) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.values(interfaceString).length)
        return;
    let finishedInterface = utils.replaceAllInString(interfaceString, '"', "");
    finishedInterface = utils.replaceAllInString(finishedInterface, "||", "|");
    yield write(`./types/${name}Options.ts`, finishedInterface);
    const res = yield exports.insert_Into_Types_Index_TS(`export * from "./${name}Options"`);
    return res;
});
const createInterface = (props, name) => {
    let varList;
    let typeDefInterface = {};
    varList = utils.compileToVarList(props);
    varList.forEach((variable) => {
        typeDefInterface[variable.var] = utils.capitalizeFirstLetter(variable.type.trim());
    });
    varList = `options: ${name}Options`;
    return { varList, typeDefInterface };
};
const createTypeDef = ({ options }, typeDefs) => __awaiter(void 0, void 0, void 0, function* () {
    const { properties, name, comment, type } = options;
    let splatTypeDefs = typeDefs
        .split("\n")
        .map((line) => line.trim());
    let scalarType;
    const { typeDefInterface } = createInterface(properties, name);
    if (!Object.keys(typeDefInterface).length)
        return splatTypeDefs;
    const index = splatTypeDefs.indexOf("# generated definitions");
    const interfaceStringified = JSON.stringify(typeDefInterface, null, 2);
    const interfaceString = `\n ${type} ${name}Options ${interfaceStringified}\n#${comment}\n# added at: ${new Date()}`;
    let finishedInterfaceDef = utils.replaceAllInString(interfaceString, '"', "");
    splatTypeDefs.splice(index + 1, 0, finishedInterfaceDef);
    splatTypeDefs = utils.replaceAllInString(splatTypeDefs.join("\n"), "Number", "Int");
    yield write("./typeDefs.ts", splatTypeDefs);
    return;
});
const createNewInterface = ({ options, }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new type interface...");
    const typeDefs = yield codeToString_1.getTypeDefs(); // current typeDef file as string
    if (!typeDefs)
        return;
    const compiledInterface = toInterface({ options: options });
    try {
        yield insertInterface(options.name, compiledInterface);
        const { typeDef } = options;
        if (typeDef)
            yield createTypeDef({ options: options }, typeDefs);
        logger_1.default.http("FROM: EPB-server: Interface created successfully, applying Prettier.");
        yield utils.applyPrettier();
        return "OK";
    }
    catch ({ message }) {
        return message;
    }
});
exports.createNewInterface = createNewInterface;
