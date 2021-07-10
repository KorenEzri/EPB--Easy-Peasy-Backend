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
exports.createNewResolver = void 0;
const codeToString_1 = require("../codeToString");
const logger_1 = __importDefault(require("../../logger/logger"));
const _1 = require(".");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const parseVars = __importStar(require("../utils/parse-vars"));
const utils = __importStar(require("../utils"));
const write = util_1.promisify(fs_1.default.writeFile);
const toResolver = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, comment, returnType, properties, description } = options;
    const { resolverInterface, varList, importList } = parseVars.parseResolverVarlist(properties);
    let stringifiedVarList = [];
    if (Array.isArray(varList)) {
        stringifiedVarList = varList.map((variable) => {
            return `${variable.name}:${variable.type}`;
        });
    }
    let resolverString = `
        // Action: ${description} \n
        ${name}: async (_:any, ${resolverInterface ? `{ options }:${name}Options` : stringifiedVarList}) => {
          // ${comment} \n
          // return ${returnType} \n
      },\n
        `;
    resolverString = utils.replaceAllInString(resolverString, "\t", "");
    resolverString = utils.replaceAllInString(resolverString, '"', "");
    yield utils.alterConfigFile("add", "resolvers", name);
    return { fullResolver: resolverString, importList };
});
const createNewResolver = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield utils.checkIfConfigItemExists("resolvers", options.name)) {
        logger_1.default.error(`FROM: EPB-server: Resolver ${options.name} already exists, aborting.`);
        return;
    }
    logger_1.default.http("FROM: EPB-server: Creating a new resolver...");
    const { fullResolver, importList } = yield toResolver({ options: options });
    let allResolversAsString = (yield codeToString_1.getResolvers()) || ""; // current resolver file as string
    if (!allResolversAsString)
        return "Error in utils/createNew/createResolver.ts: No resolvers found!";
    if (options.properties.length > 1) {
        let interfaceOptions = {};
        Object.assign(interfaceOptions, options);
        yield _1.createNewInterface({ options: interfaceOptions });
        allResolversAsString = utils.insertImportStatement(allResolversAsString, options.name);
    }
    if (Array.isArray(importList))
        importList.forEach((toImport) => {
            allResolversAsString = utils.insertImportStatement(allResolversAsString, toImport);
        });
    const finishedResolvers = utils.insertToString(allResolversAsString, fullResolver, options.type, "//");
    if (!finishedResolvers)
        return "Error in utils/createNew/createResolver.ts - @ insertToString() - returned undefined!";
    yield write("./resolvers.ts", finishedResolvers);
    logger_1.default.http("FROM: EPB-server: Action created successfully, applying Prettier for files..");
    yield utils.applyPrettier();
    return "Resolver created successfully.";
});
exports.createNewResolver = createNewResolver;
