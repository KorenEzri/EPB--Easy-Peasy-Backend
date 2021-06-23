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
exports.validateUniqueSchemaName = exports.parseOptions = exports.validateUnique = exports.validateVars = void 0;
const resolvers_1 = require("../resolvers");
const consts_1 = require("../consts");
const codeToString_1 = require("../utils/codeToString");
const schemas = __importStar(require("../db/schemas"));
const joi_1 = __importDefault(require("joi"));
const logger_1 = __importDefault(require("../logger/logger"));
const string_util_1 = require("../utils/createNew/string.util");
const typeSchema = joi_1.default.object({
    types: joi_1.default.array().items(joi_1.default.string().valid(...consts_1.validTypes)),
});
const validateTypeList = (typeList) => {
    let allTypes = [];
    allTypes = string_util_1.replaceAllInString(typeList.join(","), "||", ",").split(",");
    allTypes = string_util_1.replaceAllInString(allTypes.join(","), "|", ",").split(",");
    allTypes = allTypes.map((type) => type.trim());
    const { error, value } = typeSchema.validate({ types: allTypes });
    if (error) {
        logger_1.default.error(`FROM: EPB-server: Invalid typeList info received for validateTypeList() @ validation.util.ts ~line 24.\naborting.. Error: ${error.message}`);
        return { error: true, message: error.message };
    }
};
const validateVars = (options) => {
    const setArray = Array.from(new Set(options.properties.map((v) => v.split(":")[0].toLowerCase())));
    const optionsArray = options.properties;
    if (setArray.length !== optionsArray.length) {
        return {
            error: true,
            message: "an interface cannot have two identical property names!",
        };
    }
};
exports.validateVars = validateVars;
const validateUnique = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const allResolverNames = yield codeToString_1.getResolverNames();
    const allTypeDefs = yield codeToString_1.getTypeDefs();
    const queriesAndResolvers = Object.keys(resolvers_1.resolvers.Query).concat(Object.keys(resolvers_1.resolvers.Mutation));
    if (allResolverNames) {
        if (allResolverNames.includes(`${options.name}Options`))
            return {
                error: true,
                message: "duplicate definitions detected, aborting.",
            };
        if (allResolverNames.includes(`${options.name}`))
            return {
                error: true,
                message: "duplicate definitions detected, aborting.",
            };
    }
    if (allTypeDefs) {
        if (allTypeDefs.includes(`${options.name}Options`))
            return {
                error: true,
                message: "duplicate definitions detected, aborting.",
            };
        if (allTypeDefs.includes(`${options.name}`))
            return {
                error: true,
                message: "duplicate definitions detected, aborting.",
            };
    }
    if (queriesAndResolvers.includes(`${options.name}Options`))
        return {
            error: true,
            message: "duplicate definitions detected, aborting.",
        };
    if (queriesAndResolvers.includes(`${options.name}`))
        return {
            error: true,
            message: "duplicate definitions detected, aborting.",
        };
});
exports.validateUnique = validateUnique;
const parseOptions = (options) => {
    const validateOpts = {};
    Object.assign(validateOpts, options);
    let varList = [];
    varList = validateOpts.properties.map((variable) => {
        const splat = variable.split(":");
        const varName = splat[0];
        const varType = splat[1];
        return { var: varName, type: varType };
    });
    validateOpts.properties = varList.map((property) => property.type.trim());
    const error = validateTypeList(validateOpts.properties);
    if (error)
        return error;
    const returnType = validateOpts.returnType;
    if (returnType) {
        if (returnType.split("|").length) {
            const error = validateTypeList([returnType.split(":")[0]]);
            if (error)
                return error;
        }
    }
    return validateOpts;
};
exports.parseOptions = parseOptions;
const validateUniqueSchemaName = (options) => {
    const allSchemas = Object.keys(schemas);
    if (allSchemas.includes(`${options.name}Schema`))
        return {
            error: true,
            message: "duplicate schemas detected, aborting.",
        };
};
exports.validateUniqueSchemaName = validateUniqueSchemaName;
