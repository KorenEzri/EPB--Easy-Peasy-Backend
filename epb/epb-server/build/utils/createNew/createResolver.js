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
const prettier_1 = __importDefault(require("prettier"));
const logger_1 = __importDefault(require("../../logger/logger"));
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
let varInterface = {};
const toResolver = ({ options }) => {
    const { name, comment, returnType, vars, description } = options;
    let parsedComment;
    let varList;
    varList = utils.compileToVarList(vars);
    comment.split("//").length
        ? (parsedComment = comment)
        : (parsedComment = `// ${comment}`);
    if (vars.length < 3) {
        varList = varList.map((variable) => {
            return `${variable.var}:${variable.type}`;
        });
    }
    else {
        varInterface.options = {};
        varList.forEach((variable) => {
            varInterface.options[variable.var] = variable.type.trim().toLowerCase();
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
const insert_Into_Types_Index_TS = (exportStatement) => __awaiter(void 0, void 0, void 0, function* () {
    const typeIndexPath = "./types/index.ts";
    try {
        const isOK = yield codeToString_1.checkIfOK(typeIndexPath);
        if (!isOK)
            return "ERROR";
        const typeIndexFile = yield read(typeIndexPath, "utf8");
        try {
            const assorted = typeIndexFile.split("\n");
            assorted.push(exportStatement);
            yield write(typeIndexPath, assorted.join("\n"));
        }
        catch ({ message }) {
            logger_1.default.error(message);
            return "ERROR";
        }
    }
    catch ({ message }) {
        logger_1.default.error(message);
        return "ERROR";
    }
});
const insertInterface = (splatResolvers, name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.values(varInterface).length)
        return splatResolvers;
    const index = splatResolvers.indexOf("// option types");
    const importStateMent = `${splatResolvers[index + 1]}`.split(",");
    importStateMent.splice(1, 0, ` ${name}Options`);
    splatResolvers.splice(index + 1, 1, importStateMent.join(","));
    const interfaceString = `export interface ${name}Options ${JSON.stringify(varInterface, null, 2)}\n// added at: ${new Date()}`;
    yield write(`./types/${name}Options.ts`, utils.replaceAllInString(interfaceString, '"', ""));
    yield insert_Into_Types_Index_TS(`export * from "./${name}Options"`);
    return splatResolvers;
});
const createNewResolver = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    // compile a resolver string from options
    const fullResolver = toResolver({ options: options });
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
    const revisedResolvers = yield insertInterface(splatResolvers, options.name);
    const formatted = prettier_1.default.format(revisedResolvers.join("\n"), {
        semi: false,
        parser: "babel",
    });
    yield write("./resolvers.ts", formatted);
});
exports.createNewResolver = createNewResolver;
