"use strict";
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
exports.validateTypeCreation = exports.typeSchema = exports.allTypeNames = void 0;
const joi_1 = __importDefault(require("joi"));
const logger_1 = __importDefault(require("../logger/logger"));
const resolvers_1 = require("../resolvers");
const validation_util_1 = require("./validation.util");
exports.allTypeNames = [""];
const interval = setInterval(() => {
    try {
        const allQueries = Object.keys(resolvers_1.resolvers.Query);
        const allMutations = Object.keys(resolvers_1.resolvers.Mutation);
        if (allQueries && allMutations)
            exports.allTypeNames = allQueries.concat(allMutations);
        if (exports.allTypeNames) {
            exports.typeSchema = joi_1.default.object({
                name: joi_1.default.string()
                    .required()
                    .invalid(...exports.allTypeNames),
                properties: joi_1.default.array(),
                comment: joi_1.default.string().allow(""),
                dbSchema: joi_1.default.boolean(),
                typeDef: joi_1.default.boolean(),
                type: joi_1.default.string(),
            });
            clearInterval(interval);
        }
    }
    catch ({ message }) { }
}, 300);
exports.typeSchema = joi_1.default.object({
    comment: joi_1.default.string().allow(""),
});
const validateTypeCreation = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const varsValid = validation_util_1.validateVars(options);
    if (varsValid)
        return varsValid;
    const uniqueValid = yield validation_util_1.validateUnique(options);
    if (uniqueValid)
        return uniqueValid;
    const parsedOptions = validation_util_1.parseOptions(options);
    const { error, value } = exports.typeSchema.validate(parsedOptions);
    if (error) {
        logger_1.default.error(`FROM: EPB-server: Invalid type info received, aborting.. Error: ${error.message}`);
        return { error: true, message: error.message };
    }
    else
        return { error: false, message: "OK" };
});
exports.validateTypeCreation = validateTypeCreation;
