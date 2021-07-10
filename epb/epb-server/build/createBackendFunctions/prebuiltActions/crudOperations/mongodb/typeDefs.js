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
exports.createTypedefFromOpts = void 0;
const utils = __importStar(require("../../../utils"));
const mongoUtils = __importStar(require("./util"));
const create = __importStar(require("../../../create"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../../../../logger/logger"));
const read = util_1.promisify(fs_1.default.readFile);
const getTypedefInterfaceFromModelName = (model) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = `types/${model}Options.ts`;
    const interfaceFileLineArray = utils.toLineArray(yield read(filePath, "utf8"));
    const typeDefInterface = {};
    let startIndex = -2, endIndex = -2;
    interfaceFileLineArray.forEach((line) => {
        if (line.includes("export interface") && startIndex === -2) {
            startIndex = interfaceFileLineArray.indexOf(line);
        }
        else if (line.includes("// added at:") && endIndex === -2) {
            endIndex = interfaceFileLineArray.indexOf(line);
        }
    });
    typeDefInterface.properties = interfaceFileLineArray
        .slice(startIndex + 2, endIndex - 2)
        .map((line) => utils.replaceAllInString(line.trim(), ",", ""));
    return typeDefInterface;
});
const createTypedefFromOpts = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const modelNameOnly = utils.replaceAllInString(options.Model, "Schema", "");
    const typeDefInterface = yield getTypedefInterfaceFromModelName(modelNameOnly);
    const lowerCaseAction = options.action.toLowerCase();
    const mutationQuery = mongoUtils.mutationCRUDS.includes(options.action);
    const returnType = mutationQuery
        ? "String"
        : lowerCaseAction.includes("many") || lowerCaseAction.includes("all")
            ? `[${utils.lowercaseFirstLetter(modelNameOnly)}OptionsType]`
            : `${utils.lowercaseFirstLetter(modelNameOnly)}OptionsType`;
    const type = mutationQuery ? "Mutation" : "Query";
    const createCustomTypeOptions = {
        options: {
            properties: mutationQuery ? typeDefInterface.properties : undefined,
            name: modelNameOnly,
            comment: "Custom type created by CRUD generator",
            dbSchema: true,
            typeDef: true,
            returnType,
            type,
            tsInterface: "no",
            actionName: utils.lowercaseFirstLetter(options.action),
        },
    };
    logger_1.default.http("FROM: EPB-server: Creating a new type definition..");
    yield create.createNewInterface(createCustomTypeOptions);
    createCustomTypeOptions.options.returnType = "";
    yield create.createNewInterface(createCustomTypeOptions);
});
exports.createTypedefFromOpts = createTypedefFromOpts;
