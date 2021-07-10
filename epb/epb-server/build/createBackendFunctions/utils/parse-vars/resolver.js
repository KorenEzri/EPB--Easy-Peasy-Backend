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
exports.parseResolverVarlist = void 0;
const utils = __importStar(require(".."));
const parseUtils = __importStar(require("../parse-vars.util"));
const parseResolverVarlist = (vars) => {
    let varList = utils.splitNameType(vars);
    let importList = [];
    const resolverInterface = vars.length < 3 ? undefined : { options: {} };
    if (!Array.isArray(varList))
        return { importList, varList };
    varList = varList.map((variable) => {
        let type = utils.removeLastWordFromString(variable.type, ["Type", "Input"]);
        if (!parseUtils.isCustomType(type) &&
            !parseUtils.isCustomType(`${type}Input`) &&
            !parseUtils.isCustomType(`${type}Type`)) {
            type = type.toLowerCase();
        }
        else {
            importList.push(type.split("[").join("").split("]").join(""));
        }
        type = parseUtils.parseArrayOperatorTypes(type);
        type = utils.replaceAllInString(type, "int", "number");
        type = utils.replaceAllInString(type, "Int", "number");
        type = utils.replaceAllInString(type, "date", "Date");
        if (resolverInterface)
            resolverInterface.options[variable.name] = type;
        return { name: variable.name, type };
    });
    return { resolverInterface, varList, importList };
};
exports.parseResolverVarlist = parseResolverVarlist;
//
