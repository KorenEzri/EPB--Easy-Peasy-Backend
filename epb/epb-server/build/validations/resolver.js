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
exports.validateResolverCreation = exports.resolverSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const logger_1 = __importDefault(require("../logger/logger"));
const _1 = require("./");
const validation_util_1 = require("./validation.util");
const interval = setInterval(() => {
    try {
        if (_1.allTypeNames.length) {
            exports.resolverSchema = joi_1.default.object({
                name: joi_1.default.string()
                    .required()
                    .invalid(..._1.allTypeNames),
                type: joi_1.default.string().required(),
                returnType: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                properties: joi_1.default.array(),
                comment: joi_1.default.string().allow(""),
            });
            clearInterval(interval);
        }
    }
    catch ({ message }) { }
}, 300);
exports.resolverSchema = joi_1.default.object({
    comment: joi_1.default.string().allow(""),
});
const validateResolverCreation = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const varsValid = validation_util_1.validateVars(options);
    if (varsValid)
        return varsValid;
    const uniqueValid = yield validation_util_1.validateUnique(options);
    if (uniqueValid)
        return uniqueValid;
    const parsedOptions = validation_util_1.parseOptions(options);
    const { error, value } = exports.resolverSchema.validate(parsedOptions);
    if (error) {
        logger_1.default.error(`FROM: EPB-server: Invalid resolver info received, aborting.. Error: ${error.message}`);
        return { error: true, message: error.message };
    }
    else
        return { error: false, message: "OK" };
});
exports.validateResolverCreation = validateResolverCreation;
