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
exports.restartServer = exports.addToAllowedTypes = exports.checkIfFileAlreadyExists = exports.checkIfOK = exports.applyPrettier = exports.addExportStatement = void 0;
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
const unlink = util_1.promisify(fs_1.default.unlink);
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
    //   'node_modules/@korenezri/easy-peasy-backend/epb/client/build" "nodemon index.ts" "nodemon node_modules/@korenezri/easy-peasy-backend/epb/epb-server/build/restart.json',
    //   `{"restart":"${Math.random()}"}`
    // );
});
exports.restartServer = restartServer;
