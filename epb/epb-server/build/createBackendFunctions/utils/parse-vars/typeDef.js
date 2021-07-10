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
exports.parseTypeDefVarlist = void 0;
const utils = __importStar(require(".."));
const checkIfAllTypesAreCustomTypes = (variables) => {
    const areAllVarsCustomTypes = variables.map((variable) => {
        if (utils.isCustomType(`${variable.type}`)) {
            return "custom";
        }
        else
            return "not_custom";
    });
    if (!areAllVarsCustomTypes.includes("not_custom"))
        // if there is no 'not_custom' at all in the arrray, all are custom types.
        return true;
    else
        return false;
};
const compileVarlistAndTypedefInterfaceForCustomTypes = (varList, name, many) => {
    const amountOfVars = varList.length;
    const typeDefInterface = {};
    if (amountOfVars === 0)
        return {
            varList,
            typeDefInterface: undefined,
        };
    const moreThanOneVarInVarlist = amountOfVars > 1 ? true : false;
    if (!moreThanOneVarInVarlist) {
        const { type, name } = varList[0];
        return {
            varList: `${name}:${type}`,
        };
    }
    varList.forEach((variable) => {
        const { name, type } = variable;
        typeDefInterface[name] = type;
    });
    return {
        varList: `options: ${many ? `[${name}Options]` : `${name}Options`}`,
        typeDefInterface,
    };
};
const parseSingleTypedefVariable = (variable) => {
    let { name, type } = variable;
    if (!name && !type)
        return "";
    if (utils.isCustomType(type))
        return `${name}:${type}`;
    const capType = utils.capitalizeFirstLetter(type);
    type = utils.parseArrayOperatorTypes(capType, true);
    return type;
};
const compileVarlistAndTypedefInterface = (varList, name, many) => {
    const typeDefInterface = {};
    const moreThanOneVarInVarlist = varList.length > 1 ? true : false;
    if (!moreThanOneVarInVarlist) {
        return {
            varList: `${varList[0].name}:${parseSingleTypedefVariable(varList[0])}`,
        };
    }
    else {
        varList.forEach((variable) => {
            if (!variable.name)
                return;
            typeDefInterface[variable.name] = parseSingleTypedefVariable(variable);
        });
        return {
            varList: `options: ${many ? `[${name}OptionsInput]` : `${name}OptionsInput`}`,
            typeDefInterface,
        };
    }
};
const parseTypeDefVarlist = (vars, name, many) => {
    let varList = utils.splitNameType(vars); // return a list of { name: foo, type: string } .
    Array.isArray(varList) ? varList : (varList = [varList]);
    const areAllTypesCustomTypes = checkIfAllTypesAreCustomTypes(varList);
    if (areAllTypesCustomTypes) {
        return compileVarlistAndTypedefInterfaceForCustomTypes(varList, name, many);
    }
    else {
        return compileVarlistAndTypedefInterface(varList, name, many);
    }
};
exports.parseTypeDefVarlist = parseTypeDefVarlist;
