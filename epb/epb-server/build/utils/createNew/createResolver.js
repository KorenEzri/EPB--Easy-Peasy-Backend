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
const utils = __importStar(require("./string.util"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const codeToString_1 = require("../codeToString");
const _1 = require("./");
const logger_1 = __importDefault(require("../../logger/logger"));
const write = util_1.promisify(fs_1.default.writeFile);
let varInterface = {};
const toResolver = ({ options }) => {
    const { name, comment, returnType, properties, description } = options;
    let parsedComment;
    let varList;
    varList = utils.compileToVarList(properties);
    comment.split("//").length
        ? (parsedComment = comment)
        : (parsedComment = `// ${comment}`);
    if (properties.length < 3) {
        varList = varList.map((variable) => {
            return `${variable.var}:${variable.type}`;
        });
    }
    else {
        varInterface.options = {};
        varList.forEach((variable) => {
            const lowerCaseVar = utils.fixTypes(variable);
            varInterface.options[variable.var] = lowerCaseVar;
        });
        varList = `{ options }:${name}Options`;
    }
    return `
      // Action: ${description}
      ${name}: async (_:any, ${varList}) => {
        // ${parsedComment}
        // return ${returnType}
    },
      `;
};
const insertInterface = (splatResolvers, name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.values(varInterface).length)
        return splatResolvers;
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
        return;
    if (importStatement.length > 1) {
        importStatement.splice(1, 0, ` ${name}Options,`);
        splatResolvers.splice(startIndex + 1, endIndex - startIndex - 1, importStatement.join(""));
    }
    else {
        const splat = importStatement[0].split(",");
        splat[0] = `${splat[0]}, ${name}Options`;
        splatResolvers.splice(startIndex + 1, 1, splat.join(","));
    }
    let interfaceString = `export interface ${name}Options ${JSON.stringify(varInterface, null, 2)}\n// added at: ${new Date()}`;
    interfaceString = utils.replaceAllInString(interfaceString, '"', "");
    interfaceString = utils.replaceAllInString(interfaceString, "||", "|");
    yield write(`./types/${name}Options.ts`, interfaceString);
    yield _1.insert_Into_Types_Index_TS(`export * from "./${name}Options"`);
    return splatResolvers;
});
const createNewResolver = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new resolver...");
    // compile a resolver string from options
    const fullResolver = utils.replaceAllInString(toResolver({ options: options }), "\t", "");
    const resolvers = yield codeToString_1.getResolvers(); // current resolver file as string
    if (!resolvers)
        return "ERROR";
    const splatResolvers = resolvers
        .split("\n")
        .map((line) => line.trim());
    let indexToPush; // The index (line number) in which the next resolver is meant to enter.
    options.type.toLowerCase() === "mutation" // mutation or query? different line number
        ? (indexToPush = splatResolvers.indexOf("// mutation-end"))
        : (indexToPush = splatResolvers.indexOf("// query-end"));
    // push into line indexToPush the compiled resolver.
    splatResolvers.splice(indexToPush, 0, fullResolver);
    // insert interface into resolvers if needed.
    const insertedInterface = yield insertInterface(splatResolvers, options.name);
    if (!insertedInterface)
        return "ERROR";
    const revisedResolvers = insertedInterface.join("\n");
    yield write("./resolvers.ts", revisedResolvers);
    logger_1.default.http("FROM: EPB-server: Action created successfully, applying Prettier for files..");
    yield utils.applyPrettier();
    return;
});
exports.createNewResolver = createNewResolver;
