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
exports.applyPrettier = exports.fixTypes = exports.capitalizeFirstLetter = exports.compileToVarList = exports.replaceAllInString = void 0;
const execa_1 = __importDefault(require("execa"));
const logger_1 = __importDefault(require("../../logger/logger"));
const replaceAllInString = (str, find, replace) => {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, "g"), replace);
};
exports.replaceAllInString = replaceAllInString;
const compileToVarList = (vars) => {
    return vars.map((variable) => {
        const splat = variable.split(":");
        const varb = splat[0];
        const varType = splat[1];
        return { var: varb, type: varType };
    });
};
exports.compileToVarList = compileToVarList;
const capitalizeFirstLetter = (string) => {
    if (string[0] === "[")
        return "[" + string.charAt(1).toUpperCase() + string.slice(2);
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const fixTypes = (variable, toUpperCase) => {
    let lowerCaseVar = variable.type.trim().toLowerCase();
    lowerCaseVar = exports.replaceAllInString(lowerCaseVar, "int", "number");
    lowerCaseVar = exports.replaceAllInString(lowerCaseVar, "Int", "number");
    lowerCaseVar = exports.replaceAllInString(lowerCaseVar, "date", "Date");
    if (toUpperCase)
        return exports.capitalizeFirstLetter(lowerCaseVar);
    return lowerCaseVar;
};
exports.fixTypes = fixTypes;
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
