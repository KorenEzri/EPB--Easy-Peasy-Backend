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
exports.createNewTypeDef = void 0;
const typeDefs_1 = require("../../typeDefs");
const codeToString_1 = require("../codeToString");
const util_1 = require("util");
const logger_1 = __importDefault(require("../../logger/logger"));
const fs_1 = __importDefault(require("fs"));
const utils = __importStar(require("../utils"));
const write = util_1.promisify(fs_1.default.writeFile);
const allTypeDefinitions = typeDefs_1.typeDefs.definitions.map((definition) => definition.name.value.trim());
const grabTypeDefsAndInsertNewTypeDef = (name, properties, type, returnType) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeDef, typeDefInterface } = fromOptionsToGQLTypeDefinition(name, properties, returnType);
    const allTypeDefsAsString = yield codeToString_1.getTypeDefs(); // current typeDef file as string
    if (!allTypeDefsAsString)
        return "Error with utils/createNew/createTypeDef.ts, getTypeDefs() returned undefined!";
    const typeDefLineArray = utils.toLineArray(allTypeDefsAsString);
    if (typeDefLineArray.includes(typeDef) ||
        utils.isCustomType(`${name}Options`) ||
        allTypeDefinitions.includes(`${name.trim()}Options`)) {
        // check if typeDef already exists
        return { error: "Duplicate type definitions detected, aborting.." };
    }
    else {
        allTypeDefinitions.push(`${name.trim()}Options`);
    }
    let finishedTypeDefs = insertTypeDefInterface(allTypeDefsAsString, name, typeDefInterface, type, returnType);
    let typeInsertEndIndex = type === "Query" ? "# query-end" : "# mutation-end";
    typeInsertEndIndex = utils
        .toLineArray(finishedTypeDefs)
        .map((line) => line.trim())
        .indexOf(typeInsertEndIndex);
    if (returnType) {
        finishedTypeDefs = utils.pushIntoString(finishedTypeDefs, typeInsertEndIndex, 0, typeDef);
    }
    return finishedTypeDefs;
});
const fromOptionsToGQLTypeDefinition = (name, properties, returnType) => {
    const { varList, typeDefInterface } = utils.parseTypeDefVarlist(properties, name);
    if (returnType) {
        if (utils.isCustomType(returnType)) {
        }
        else
            returnType = utils.capitalizeFirstLetter(returnType);
    }
    let typeDef;
    if (!Array.isArray(varList)) {
        typeDef = `${name}(${varList}): ${returnType}`;
    }
    else {
        typeDef = `${name}: ${returnType}
    `;
    }
    return { typeDef, typeDefInterface };
};
const insertTypeDefInterface = (typeDefs, name, typeDefInterface, type, returnType) => {
    let interfacePreFix;
    type === "Query"
        ? (interfacePreFix = "type")
        : type === "type"
            ? (interfacePreFix = type)
            : type === "input"
                ? (interfacePreFix = "input")
                : (interfacePreFix = "type");
    if (returnType)
        interfacePreFix = "input";
    const handlerA = "# generated definitions";
    const interfaceString = JSON.stringify(typeDefInterface, null, 2);
    const typeDef = interfaceString
        ? `\n ${interfacePreFix} ${name}Options ${interfaceString}\n# added at: ${new Date()}`
        : undefined;
    let finishedInterfaceDef = utils.replaceAllInString(typeDef || "", ['"', "Number"], ["", "Int"]);
    const finishedTypeDefs = utils.pushIntoString(typeDefs, handlerA, 0, finishedInterfaceDef);
    return finishedTypeDefs;
};
const createNewTypeDef = ({ options, }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new type definition...");
    try {
        const res = yield grabTypeDefsAndInsertNewTypeDef(options.name, options.properties, options.type, options.returnType);
        // calls fromOptionsToGQLTypeDefinition()
        if (!res || res.error) {
            logger_1.default.error(`Error creating type definition! ${res.error}`);
            if (res.error)
                return res.error;
            return res;
        }
        yield write("./typeDefs.ts", res);
        return "OK";
    }
    catch ({ message }) {
        logger_1.default.error(`From: EPB-server: Error creating type definition, ${message}`);
        return message;
    }
});
exports.createNewTypeDef = createNewTypeDef;
