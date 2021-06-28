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
const _1 = require("./");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const utils = __importStar(require("../utils"));
const write = util_1.promisify(fs_1.default.writeFile);
const insertImportStatement = (resolvers, name) => {
    const splatResolvers = utils
        .toLineArray(resolvers)
        .map((line) => line.trim());
    const startIndex = splatResolvers.indexOf("// option types");
    const endIndex = splatResolvers.indexOf("// option types end");
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
    if (importStatement.length > 1) {
        importStatement.splice(1, 0, ` ${name}Options,`);
        splatResolvers.splice(startIndex + 1, endIndex - startIndex - 1, importStatement.join(""));
    }
    else {
        const splat = importStatement[0].split(",");
        splat[0] = `${splat[0]}, ${name}Options`;
        splatResolvers.splice(startIndex + 1, 1, splat.join(","));
    }
    return splatResolvers.join("\n");
};
const toResolver = ({ options }) => {
    const { name, comment, returnType, properties, description } = options;
    const { resolverInterface, varList } = utils.parseResolverVarlist(properties);
    let resolverString = `
        // Action: ${description}
        ${name}: async (_:any, ${resolverInterface ? `{ options }:${name}Options` : varList}) => {
          // ${comment}
          // return ${returnType}
      },
        `;
    resolverString = utils.replaceAllInString(resolverString, "\t", "");
    resolverString = utils.replaceAllInString(resolverString, '"', "");
    return resolverString;
};
const createNewResolver = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new resolver...");
    const fullResolver = toResolver({ options: options });
    let allResolversAsString = yield codeToString_1.getResolvers(); // current resolver file as string
    if (!allResolversAsString)
        return "Error in utils/createNew/createResolver.ts: No resolvers found!";
    if (options.properties.length >= 3) {
        let interfaceOptions = {};
        Object.assign(interfaceOptions, options);
        yield _1.createNewInterface({ options: interfaceOptions });
        allResolversAsString = insertImportStatement(allResolversAsString, options.name);
    }
    const finishedResolvers = utils.insertToString(allResolversAsString, fullResolver, options.type, "//");
    if (!finishedResolvers)
        return "Error in utils/createNew/createResolver.ts - @ insertToString() - returned undefined!";
    yield write("./resolvers.ts", finishedResolvers);
    logger_1.default.http("FROM: EPB-server: Action created successfully, applying Prettier for files..");
    yield utils.applyPrettier();
    return "Resolver created successfully.";
});
exports.createNewResolver = createNewResolver;
