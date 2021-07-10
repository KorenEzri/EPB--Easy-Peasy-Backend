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
exports.createNewInterface = void 0;
const createTypeDef_1 = require("./createTypeDef");
const util_1 = require("util");
const logger_1 = __importDefault(require("../../logger/logger"));
const parseVars = __importStar(require("../utils/parse-vars"));
const utils = __importStar(require("../utils"));
const fs_1 = __importDefault(require("fs"));
const write = util_1.promisify(fs_1.default.writeFile);
const toInterfaceString = (importStatements, interfaceOpts, name) => {
    const stringified = JSON.stringify(interfaceOpts, null, 2);
    const imports = importStatements.join("\n");
    const interfaceString = `// imports section \n\n${imports}//\n\n// imports section end\n\nexport interface ${name}Options ${stringified}\n// added at: ${new Date()} \n\n// exports section\n\n// exports section end`;
    let finishedInterface = utils.replaceAllInString(interfaceString, '"', "");
    finishedInterface = utils.replaceAllInString(finishedInterface, "||", "|");
    return finishedInterface;
};
// turn interface object to a stringified representation.
const fromOptionsToInterfaceString = ({ options }) => {
    let interfaceOpts = { options: {} }; // this will be the interface as a string to write to a file
    const { properties, name } = options; // properties of the interface and it's name (ie const "name" = {...})
    const { importList, varList } = parseVars.parseInterfaceVarlist(properties);
    // importList = an array of import statements to add to the interface utils.
    // varList = an array of { name: string, type: string } to compose the interface object string.
    if (!Array.isArray(varList))
        return; // always will be an array, this is for TS
    varList.forEach((variable) => {
        let type = variable.type;
        type = utils.removeLastWordFromString(type, ["Type", "Input"]);
        interfaceOpts.options[variable.name] = type; // assign names and types to interfaceOpts
    });
    const importStatements = utils.toImportStatements(importList);
    // turn an array of custom type names to an array of import statements
    return toInterfaceString(importStatements, interfaceOpts, name);
};
// turn options into an interface object like: fooOptions: {options: {...}}
const writeInterfaceToFiles = (name, interfaceString) => __awaiter(void 0, void 0, void 0, function* () {
    const typesPath = "./types";
    const interfaceName = `${name}Options`;
    const typeFilePath = `${typesPath}/${interfaceName}.ts`;
    const doesSchemaFileExist = yield utils.checkIfFileAlreadyExists("./db/schemas", typeFilePath);
    if (!doesSchemaFileExist) {
        yield write(typeFilePath, interfaceString);
    }
    else {
        logger_1.default.error("FROM: EPB-server: Interface file already exists, aborting interface creation.");
    }
    const exportStatement = `export * from "./${name}Options"`;
    const res = yield utils.addExportStatement(typesPath, exportStatement);
    yield utils.alterConfigFile("add", "customTypes", interfaceName);
    return res;
});
// create a new interface file called fooOptions.ts inside ./types folder
// also adds export statement to ./types/index.ts
const createNewInterface = ({ options, }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new type interface...");
    const interfaceString = fromOptionsToInterfaceString({ options: options });
    try {
        if (options.tsInterface !== "no") {
            yield writeInterfaceToFiles(options.name, interfaceString);
            logger_1.default.http("FROM: EPB-server: Interface created successfully, applying Prettier.");
        }
        const { typeDef } = options;
        if (typeDef) {
            logger_1.default.http("FROM: EPB-server: typeDef option received, creating..");
            const res = yield createTypeDef_1.createNewTypeDef({ options: options });
            return res || "OK";
        }
        yield utils.applyPrettier();
        return "OK";
    }
    catch ({ message }) {
        return message;
    }
});
exports.createNewInterface = createNewInterface;
