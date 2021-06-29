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
const logger_1 = __importDefault(require("../../../logger/logger"));
const utils = __importStar(require("../../utils"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
const updateInterfaceFile = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    const interfaceFilePath = `./types/${options.name}Options.ts`;
    const interfaceFile = yield read(interfaceFilePath, "utf8");
    const splat = interfaceFile.split("\n");
    const importStartIndex = splat.indexOf("// imports section") + 1;
    const importEndIndex = splat.indexOf("// imports section end");
    const imports = splat.slice(importStartIndex, importEndIndex - 1);
    imports.push("import { Document } from 'mongoose'");
    splat.splice(importStartIndex, importEndIndex - importStartIndex, imports.join("\n"));
    const exportStartIndex = splat.indexOf("// exports section") + 1;
    const exportEndIndex = splat.indexOf("// exports section end");
    splat.splice(exportStartIndex, exportEndIndex - exportStartIndex, `export interface ${options.name}Doc extends Document, ${options.name}Options {}`);
    yield write(interfaceFilePath, splat.join("\n"));
});
const toMongoSchema = (options) => {
    const { properties, name, comment, uniqueIdentifiers } = options.options;
    const mongoImportsList = imports_1.imports.statements.db.mongodb;
    const { schemaInterface } = utils.parseMongoVarlist(properties, uniqueIdentifiers);
    const stringifiedMongoInterface = JSON.stringify(schemaInterface, null, 2);
    if (uniqueIdentifiers.length)
        mongoImportsList.push("import uniqueValidator from 'mongoose-unique-validator';");
    mongoImportsList.push(`import {${name}Doc} from '../../types';`);
    const schema = `
        ${mongoImportsList.join("")}
        const ${name}Schema: Schema = new mongoose.Schema(${stringifiedMongoInterface})
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
    return utils.replaceAllInString(schema, '"', "");
};
const writeSchemaToFile = (name, schema) => __awaiter(void 0, void 0, void 0, function* () {
    const schemaFilepath = `./db/schemas/${name}Schema.ts`;
    const doesSchemaFileExist = yield utils.checkIfFileAlreadyExists("./db/schemas", `${name}Schema.ts`);
    if (!doesSchemaFileExist) {
        yield write(schemaFilepath, schema);
    }
    else {
        logger_1.default.error(`FROM: EPB-server: Error: Schema file by the name ${name}Schema.ts already exists!`);
        return "Schema file already exists!";
    }
});
const createMongoDBSchema = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a MongoDB schema...");
    // await createNewInterface({ options: options });
    const mongoDBSchema = toMongoSchema({ options: options });
    logger_1.default.http("FROM: EPB-server: Schema created, updating interface file to include a mongo document export...");
    yield updateInterfaceFile({ options: options });
    let error = yield writeSchemaToFile(options.name, mongoDBSchema);
    if (error)
        return error;
    logger_1.default.http("FROM: EPB-server: Done, applying prettier for files.");
    yield utils.applyPrettier("./db/schemas/*.ts");
    return "Schema created successfully.";
});
exports.createMongoDBSchema = createMongoDBSchema;
