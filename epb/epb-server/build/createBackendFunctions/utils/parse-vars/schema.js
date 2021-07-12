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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMongoVarlist = void 0;
const utils = __importStar(require(".."));
const parseUtils = __importStar(require("../parse-vars.util"));
const arragenMongoTypes = (type) => {
    if (type.split("[").length > 1 && type.split("|").length <= 1) {
        type = "Array";
        return type;
    }
    if (type.split("|").length <= 1)
        return type;
    type = utils.replaceAllInString(type, "||", "|");
    const splat = type.split("|");
    let typeA = utils
        .capitalizeFirstLetter(utils.replaceAllInString(splat[0], "|", ""))
        .trim();
    type = utils.capitalizeFirstLetter(utils.replaceAllInString(splat[1], "|", "").trim());
    if (typeA.split("[").length > 1) {
        typeA = "Array";
    }
    if (type.split("[").length > 1) {
        type = "Array";
    }
    type = `${utils.capitalizeFirstLetter(typeA)} || ${utils.capitalizeFirstLetter(type)}`;
    return type;
};
const parseMongoVarlist = (vars, uniques) => {
    const addUniqueVariant = (type) => {
        const uniqueVarString = `
            { type: ${utils.capitalizeFirstLetter(type)}, unique: true }
        `;
        return utils.replaceAllInString(uniqueVarString, "\n", "");
    };
    const checkIfUniqueVar = (varb, uniqueList) => {
        return uniqueList
            .map((variable) => variable.split(":")[0].toLowerCase())
            .includes(varb.toLowerCase());
    };
    let varList = utils.splitNameType(vars);
    const schemaInterface = {};
    if (!Array.isArray(varList))
        return { importList: [], varList };
    varList = varList.map((variable) => {
        let type = utils.removeLastWordFromString(variable.type, ["Type", "Input"]);
        if (parseUtils.isCustomType(type)) {
            type = "Object";
        }
        type = utils.replaceAllInString(type, "int", "number");
        type = utils.replaceAllInString(type, "Int", "number");
        type = utils.replaceAllInString(type, "date", "Date");
        type = arragenMongoTypes(type);
        schemaInterface[variable.name] = utils.capitalizeFirstLetter(type);
        if (checkIfUniqueVar(variable.name, uniques)) {
            schemaInterface[variable.name] = addUniqueVariant(type);
        }
        return { name: variable.name, type };
    });
    return { schemaInterface, varList };
};
exports.parseMongoVarlist = parseMongoVarlist;
//
