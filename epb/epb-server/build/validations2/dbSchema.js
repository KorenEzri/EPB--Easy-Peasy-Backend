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
exports.validateSchemaCreation = exports.dbJoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const validation_util_1 = require("./validation.util");
const logger_1 = __importDefault(require("../logger/logger"));
exports.dbJoiSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    properties: joi_1.default.array(),
    comment: joi_1.default.string().allow(""),
    typeDef: joi_1.default.boolean(),
    dbSchema: joi_1.default.boolean(),
    type: joi_1.default.string(),
    uniqueIdentifiers: joi_1.default.array(),
});
const validateSchemaCreation = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const varsValid = validation_util_1.validateVars(options.options);
    if (varsValid)
        return varsValid;
    const uniqueValid = validation_util_1.validateUniqueSchemaName(options.options);
    if (uniqueValid)
        return uniqueValid;
    const parsedOptions = validation_util_1.parseOptions(options.options);
    const { error, value } = exports.dbJoiSchema.validate(parsedOptions);
    if (error) {
        logger_1.default.error(`FROM: EPB-server: Invalid Schema info received, aborting.. Error: ${error.message}`);
        return { error: true, message: error.message };
    }
    else
        return { error: false, message: "OK" };
});
exports.validateSchemaCreation = validateSchemaCreation;
