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
exports.createMongoDBSchema = void 0;
const imports_1 = require("../../../consts/imports");
const utils = __importStar(require("../string.util"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const __1 = require("../");
const logger_1 = __importDefault(require("../../../logger/logger"));
const codeToString_1 = require("../../codeToString");
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
const addUniqueVariant = (type) => {
    const uniqueVarString = `
        { type: ${type}, unique: true }
    `;
    return utils.replaceAllInString(uniqueVarString, "\n", "");
};
const arrangeOrOperatorTypes = (variable) => {
    let varType = variable.type;
    if (varType.split("[").length > 1 && varType.split("|").length <= 1) {
        variable.type = "Array";
        return variable;
    }
    if (varType.split("|").length <= 1)
        return variable;
    varType = utils.replaceAllInString(varType, "||", "|");
    const splat = varType.split("|");
    let varTypeA = utils
        .capitalizeFirstLetter(utils.replaceAllInString(splat[0], "|", ""))
        .trim();
    let varTypeB = utils.capitalizeFirstLetter(utils.replaceAllInString(splat[1], "|", "").trim());
    if (varTypeA.split("[").length > 1) {
        varTypeA = "Array";
    }
    if (varTypeB.split("[").length > 1) {
        varTypeB = "Array";
    }
    variable.type = `${utils.capitalizeFirstLetter(varTypeA)} || ${utils.capitalizeFirstLetter(varTypeB)}`;
    return variable;
};
const checkIfUniqueVar = (varb, uniqueList) => {
    return uniqueList
        .map((variable) => variable.split(":")[0].toLowerCase())
        .includes(varb);
};
const compileSchemaVarList = (properties, uniqueIdentifiers) => {
    const schemaInterface = {};
    let varList = utils.compileToVarList(properties);
    varList.forEach((variable) => {
        let lowerCaseType = utils.fixTypes(variable);
        variable.type = lowerCaseType;
        variable = arrangeOrOperatorTypes(variable);
    });
    varList.forEach((variable) => {
        const lowerCaseType = variable.type;
        const finishedType = utils.capitalizeFirstLetter(lowerCaseType.trim());
        schemaInterface[variable.var] = finishedType;
        if (checkIfUniqueVar(variable.var, uniqueIdentifiers)) {
            schemaInterface[variable.var] = addUniqueVariant(finishedType);
        }
    });
    const stringified = JSON.stringify(schemaInterface, null, 2);
    return utils.replaceAllInString(stringified, '"', "");
};
const toMongoSchema = (options) => {
    const { properties, name, comment, type, uniqueIdentifiers } = options.options;
    const mongoImportsList = imports_1.imports.statements.db.mongodb;
    const schemaInterface = compileSchemaVarList(properties, uniqueIdentifiers);
    if (uniqueIdentifiers.length)
        mongoImportsList.push("import uniqueValidator from 'mongoose-unique-validator';");
    mongoImportsList.push(`import {${name}Doc} from "../../types";`);
    const schema = `
        ${mongoImportsList.join("")}
        const ${name}Schema: Schema = new mongoose.Schema(${schemaInterface})
        ${uniqueIdentifiers.length
        ? `${name}Schema.plugin(uniqueValidator)`
        : ""}
        ${name}Schema.set('toJSON', {
            transform: (_: any, returnedObject: any) => {
                delete returnedObject.__v;
            }
        })
        export const ${name}Model = mongoose.model<${name}Doc>('${name}Model', ${name}Schema)
        // ${comment}
`;
    return schema;
};
const updateInterfaceFile = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    const interfaceFilePath = `./types/${options.name}Options.ts`;
    const interfaceFile = yield read(interfaceFilePath, "utf8");
    const splat = interfaceFile.split("\n");
    const importStartIndex = splat.indexOf("// imports section") + 1;
    const importEndIndex = splat.indexOf("// imports section end");
    splat.splice(importStartIndex, importEndIndex - importStartIndex, "import { Document } from 'mongoose'");
    const exportStartIndex = splat.indexOf("// exports section") + 1;
    const exportEndIndex = splat.indexOf("// exports section end");
    splat.splice(exportStartIndex, exportEndIndex - exportStartIndex, `export interface ${options.name}Doc extends Document, ${options.name}Options {}`);
    yield write(interfaceFilePath, splat.join("\n"));
});
const handleInterface = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    const interfaceFilePath = `./types/${options.name}Options.ts`;
    const doesInterfaceFileExist = yield codeToString_1.checkIfOK(interfaceFilePath);
    if (doesInterfaceFileExist) {
        logger_1.default.http("FROM: EPB-server: Updating an existing interface file..");
        yield updateInterfaceFile({ options: options });
    }
    else if (!doesInterfaceFileExist) {
        logger_1.default.http("FROM: EPB-server: Creating a new interface file..");
        yield __1.createNewInterface({ options: options });
        yield updateInterfaceFile({ options: options });
    }
    else {
        logger_1.default.error("FROM: EPB-server: Failed to detect interface file, yet it seems an import to it in ./types/index.ts exists. Aborting.");
    }
});
const writeSchemaToFile = (name, schema) => __awaiter(void 0, void 0, void 0, function* () {
    const schemaFilepath = `./db/schemas/${name}Schema.ts`;
    const doesSchemaFileExist = yield codeToString_1.checkIfOK(schemaFilepath);
    if (!doesSchemaFileExist)
        yield write(schemaFilepath, schema);
});
const createMongoDBSchema = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a MongoDB schema...");
    const mongoDBSchema = toMongoSchema({ options: options });
    logger_1.default.http("FROM: EPB-server: Schema created, applying...");
    yield writeSchemaToFile(options.name, mongoDBSchema);
    yield handleInterface({ options: options });
    logger_1.default.http("FROM: EPB-server: Done, applying prettier for files.");
    yield utils.applyPrettier("./db/schemas/*.ts");
});
exports.createMongoDBSchema = createMongoDBSchema;
//// FIX '[' parsing in dbSchema creation
/// FIX : || operator parsing - add uppercase to right hand side of || operator.
