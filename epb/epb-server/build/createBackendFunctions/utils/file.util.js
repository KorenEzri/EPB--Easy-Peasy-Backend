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
exports.getAllSchemaProps = exports.getAllAllowedTypes = exports.checkIfConfigItemExists = exports.alterConfigFile = exports.checkForDuplicateLines = exports.checkIfLinesAlreadyExist = exports.insertStringToFileInRangeOfLines = exports.insertImportStatement = exports.getAllSchemaNames = exports.restartServer = exports.addToAllowedTypes = exports.checkIfFileAlreadyExists = exports.checkIfOK = exports.applyPrettier = exports.addExportStatement = void 0;
const consts_1 = require("../../consts");
const logger_1 = __importDefault(require("../../logger/logger"));
const fs_1 = __importDefault(require("fs"));
const execa_1 = __importDefault(require("execa"));
const util_1 = require("util");
const utils = __importStar(require("."));
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
const readDir = util_1.promisify(fs_1.default.readdir);
const access = util_1.promisify(fs_1.default.access);
const addExportStatement = (filePath, exportStatement) => __awaiter(void 0, void 0, void 0, function* () {
    const path = `${filePath}/index.ts`;
    try {
        const isOK = yield exports.checkIfOK(path);
        if (!isOK)
            return "Error in create/file.util.ts/addExportStatement() - checkIfOK() returned 'undefined'";
        const readFile = yield read(path, "utf8");
        const lineArray = utils.toLineArray(readFile);
        if (!lineArray.includes(exportStatement)) {
            lineArray.push(exportStatement);
            yield write(path, utils.fromLineArray(lineArray));
            return "OK";
        }
        else {
            return "Export statement already exists, please update the interface's file instead.";
        }
    }
    catch ({ message }) {
        logger_1.default.error(message);
        return message;
    }
});
exports.addExportStatement = addExportStatement;
const applyPrettier = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        path
            ? yield execa_1.default(`npx prettier --write ${path}`)
            : yield execa_1.default("npx prettier --write *.ts");
    }
    catch ({ message }) {
        logger_1.default.error(`FROM: EPB-server: ${message}`);
    }
});
exports.applyPrettier = applyPrettier;
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
const checkIfFileAlreadyExists = (dirPath, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const dir = yield readDir(dirPath);
    if (dir.includes(fileName) || dir.includes(`${fileName}.ts`)) {
        return true;
    }
    else
        return false;
});
exports.checkIfFileAlreadyExists = checkIfFileAlreadyExists;
const addToAllowedTypes = (name) => {
    consts_1.allCustomTypesWithArrayTypes.push(`[${name}Options]`);
    consts_1.allCustomTypesWithArrayTypes.push(`${name}Options[]`);
    consts_1.allCustomTypesWithArrayTypes.push(`${name}Options`);
};
exports.addToAllowedTypes = addToAllowedTypes;
const restartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // await write(
    //   'node_modules/@korenezri/easy-peasy-backend/epb/client/build" "nodemon index.ts" "nodemon node_modules/@korenezri/easy-peasy-backend/epb/epb-server/build/restart.py',
    //   `{"restart":"${Math.random()}"}`
    // );
    yield write("restart.py", `{"restart":"${Math.random()}"}`);
});
exports.restartServer = restartServer;
const getAllSchemaNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const schemaFolderPath = "db/schemas";
    const isOK = yield exports.checkIfOK(schemaFolderPath);
    if (!isOK) {
        logger_1.default.error("FROM: EPB-server: could not locate databse schema folder!");
    }
    const allSchemaNames = yield readDir(schemaFolderPath);
    return allSchemaNames.filter((val) => {
        if (val !== "index.ts" &&
            val !== "stub.ts" &&
            val != null &&
            !val.includes("SchemaConfig"))
            return val.split(".ts").join("");
    });
});
exports.getAllSchemaNames = getAllSchemaNames;
const insertImportStatement = (resolvers, name) => {
    const splatResolvers = utils
        .toLineArray(resolvers)
        .map((line) => line.trim());
    const startIndex = splatResolvers.indexOf("// option types");
    const endIndex = splatResolvers.indexOf("// option types end");
    let importName = "";
    const importStatement = splatResolvers
        .map((line, index) => {
        if (index >= startIndex + 1 && index <= endIndex - 1) {
            return line;
        }
    })
        .filter((v) => {
        return v != null;
    });
    if (!importStatement[0])
        return "err";
    if (importStatement.includes(name) ||
        importStatement.includes(`${name}Options`) ||
        importStatement[0].includes(name) ||
        importStatement[0].includes(`${name}Options`)) {
        return splatResolvers.join("\n");
    }
    if (importStatement.length > 1) {
        let nameOptionsStringIncluded = name.includes("Options");
        nameOptionsStringIncluded
            ? (importName = ` ${name},`)
            : (importName = ` ${name}Options,`);
        importStatement.splice(1, 0, importName);
        splatResolvers.splice(startIndex + 1, endIndex - startIndex - 1, importStatement.join(""));
    }
    else {
        const splat = importStatement[0].split(",");
        splat[0] = `${splat[0]}, ${name}Options`;
        splatResolvers.splice(startIndex + 1, 1, splat.join(","));
    }
    return splatResolvers.join("\n");
};
exports.insertImportStatement = insertImportStatement;
const insertStringToFileInRangeOfLines = (filePath, string, startHandler, endHandler, duplicates, addToStartIndex, addString) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    addToStartIndex = addToStartIndex ? addToStartIndex : 0;
    const fileAsString = yield read(filePath, "utf8");
    const lineArray = yield utils
        .toLineArray(fileAsString)
        .map((line) => line.trim());
    const startIndex = typeof startHandler === "number"
        ? startHandler
        : lineArray.indexOf(startHandler);
    const endIndex = typeof endHandler === "number" ? endHandler : lineArray.indexOf(endHandler);
    const linesInRange = lineArray
        .map((line, index) => {
        if (index >= startIndex + 1 && index <= endIndex - 1) {
            return line.trim();
        }
    })
        .filter((v) => v != null);
    if ((linesInRange === null || linesInRange === void 0 ? void 0 : linesInRange.includes(string)) || ((_a = linesInRange[0]) === null || _a === void 0 ? void 0 : _a.includes(string))) {
        if (!duplicates)
            return lineArray.join("\n");
    }
    if (linesInRange.length > 1) {
        linesInRange.splice(1, 0, string);
        lineArray.splice(startIndex, endIndex - startIndex, addString + "\n" + linesInRange.join(""));
    }
    else {
        const splatOneLineRange = linesInRange[0].split("}");
        if (!addString)
            addString = "";
        splatOneLineRange[0] = `${splatOneLineRange[0]}, ${string} }`;
        lineArray.splice(startIndex + 1 + addToStartIndex, 1, splatOneLineRange.join(""));
    }
    const finished = utils.fromLineArray(lineArray);
    yield write(filePath, finished);
});
exports.insertStringToFileInRangeOfLines = insertStringToFileInRangeOfLines;
const checkIfLinesAlreadyExist = (lines, filePath, fileAsString) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filePath && !fileAsString)
        return { error: true, message: "No file or filepath provided." };
    if (filePath && !fileAsString) {
        fileAsString = yield read(filePath, "utf8");
    }
    if (!fileAsString)
        return { error: true, message: "Could not read file." };
    fileAsString = fileAsString
        .split("\n")
        .map((line) => utils.replaceAllInString(line.trim(), [",", " ", ";", "\n", "\r", "\t"], ["", "", "", "", "", ""]))
        .filter((line) => !(line.includes("#") || line.includes("//")))
        .join("\n");
    lines = lines
        .split("\n")
        .map((line) => utils.replaceAllInString(line.trim(), [",", " ", ";", "\n", "\r", "\t"], ["", "", "", "", "", ""]))
        .filter((line) => !(line.includes("#") || line.includes("//")))
        .join("\n");
    if (fileAsString.includes(lines))
        return { error: true, message: "Duplicates found" };
    return { error: false };
});
exports.checkIfLinesAlreadyExist = checkIfLinesAlreadyExist;
const checkForDuplicateLines = (filePath, fileAsString) => __awaiter(void 0, void 0, void 0, function* () {
    const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index);
    if (!filePath && !fileAsString)
        return { error: true, message: "No file or filepath provided." };
    if (filePath && !fileAsString) {
        fileAsString = yield read(filePath, "utf8");
    }
    if (!fileAsString)
        return { error: true, message: "Could not read file." };
    const fileLineArray = utils
        .toLineArray(fileAsString)
        .map((line) => line.trim());
    const duplicates = findDuplicates(fileLineArray);
    if (duplicates.length > 0) {
        return {
            error: true,
            message: `Duplicate lines detected in file ${filePath}.`,
            duplicates,
        };
    }
    else
        return { error: false };
});
exports.checkForDuplicateLines = checkForDuplicateLines;
const alterConfigFile = (action, contentHeader, content, type) => __awaiter(void 0, void 0, void 0, function* () {
    if (!type)
        type = "array";
    const addToContent = (content, toAdd, type) => {
        if (!content)
            return type === "array" ? [toAdd] : toAdd;
        if (Array.isArray(content)) {
            if (!content.includes(toAdd))
                content.push(toAdd);
            return content;
        }
        else
            return content.includes(toAdd) ? content : content + toAdd;
    };
    const removeFromContent = (content, toRemove) => {
        if (!content)
            return;
        if (Array.isArray(content)) {
            const index = content === null || content === void 0 ? void 0 : content.indexOf(toRemove);
            return content === null || content === void 0 ? void 0 : content.splice(index, 1);
        }
        else
            return content === null || content === void 0 ? void 0 : content.split(`${toRemove}`).join("");
    };
    const filePath = "epb.config.json";
    const jsonFileAsJSON = JSON.parse(yield read(filePath, "utf8"));
    const configFileContent = jsonFileAsJSON[contentHeader];
    action === "add"
        ? (jsonFileAsJSON[contentHeader] = addToContent(configFileContent, content, type))
        : removeFromContent(configFileContent, content);
    yield write(filePath, JSON.stringify(jsonFileAsJSON));
});
exports.alterConfigFile = alterConfigFile;
const checkIfConfigItemExists = (contentHeader, item) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = "epb.config.json";
    const jsonFileAsJSON = JSON.parse(yield read(filePath, "utf8"));
    const configFileContent = jsonFileAsJSON[contentHeader];
    return configFileContent === null || configFileContent === void 0 ? void 0 : configFileContent.includes(item);
});
exports.checkIfConfigItemExists = checkIfConfigItemExists;
const getAllAllowedTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = "epb.config.json";
    const jsonFileAsJSON = JSON.parse(yield read(filePath, "utf8"));
    const content = jsonFileAsJSON.typeDefInterfaces;
    content.forEach((type) => {
        if (!type.includes("[")) {
            content.push(`[${type}]`);
        }
    });
    return content;
});
exports.getAllAllowedTypes = getAllAllowedTypes;
const getAllSchemaProps = (schemaName) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = `db/schemas/${schemaName}`;
    const schemaAsString = yield read(filePath, "utf8");
    const schemaNameOnly = schemaName.split(".ts").join("");
    const schemaFileLineArray = utils.toLineArray(schemaAsString);
    const startIndex = schemaFileLineArray.indexOf(`const ${schemaNameOnly}: Schema = new mongoose.Schema({`) + 1;
    const endIndex = schemaFileLineArray.indexOf(`${schemaNameOnly}.plugin(uniqueValidator);`) -
        1;
    const allProperties = schemaFileLineArray.splice(startIndex, endIndex - startIndex);
    return allProperties.map((property) => utils.replaceAllInString(property.trim(), ",", ""));
});
exports.getAllSchemaProps = getAllSchemaProps;
