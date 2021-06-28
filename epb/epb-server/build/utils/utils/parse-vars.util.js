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
exports.parseTypeDefVarlist = exports.parseMongoVarlist = exports.parseResolverVarlist = exports.parseInterfaceVarlist = exports.parseArrayOperatorTypes = exports.isCustomType = void 0;
const consts_1 = require("../../consts");
const utils = __importStar(require("."));
// for graphQL types I add "Type" || "Input" accordingly to definition names,
// so users can make both type and input definitions.
const isCustomType = (type) => {
    if (type.toLowerCase() === "date")
        return false;
    return consts_1.allCustomTypesWithArrayTypes.includes(type) ? true : false;
};
exports.isCustomType = isCustomType;
// checks if the type is a custom type (IE an existing type that is not string, number, etc)
const parseArrayOperatorTypes = (type) => {
    if (type.includes("[") && type.includes("]")) {
        let typeString = type.split("[").join("").split("]");
        typeString = typeString + "[]";
        typeString = typeString.split(",").join("");
        return typeString;
    }
    else
        return type;
};
exports.parseArrayOperatorTypes = parseArrayOperatorTypes;
const parseInterfaceVarlist = (vars) => {
    let varList = utils.splitNameType(vars);
    let importList = [];
    if (!Array.isArray(varList))
        return { importList: [], varList };
    varList = varList.map((variable) => {
        let type = variable.type;
        if (exports.isCustomType(type)) {
            importList.push(utils.removeLastWordFromString(type, ["Type", "Input"]));
        }
        else {
            type = type.toLowerCase();
        }
        type = exports.parseArrayOperatorTypes(type);
        type = utils.replaceAllInString(type, "int", "number");
        type = utils.replaceAllInString(type, "Int", "number");
        type = utils.replaceAllInString(type, "date", "Date");
        return { name: variable.name, type };
    });
    return { importList, varList };
};
exports.parseInterfaceVarlist = parseInterfaceVarlist;
// take an array of strings that look like this: "foo: int"
// and turn it into an array of { name: foo, type: int } and return it as varList
// also return importList - an array of custom types to import later in the interface's file.
const parseResolverVarlist = (vars) => {
    let varList = utils.splitNameType(vars);
    const resolverInterface = vars.length < 3 ? undefined : { options: {} };
    if (!Array.isArray(varList))
        return { importList: [], varList };
    varList = varList.map((variable) => {
        let type = utils.removeLastWordFromString(variable.type, ["Type", "Input"]);
        if (!exports.isCustomType(type)) {
            type = type.toLowerCase();
        }
        type = utils.replaceAllInString(type, "int", "number");
        type = utils.replaceAllInString(type, "Int", "number");
        type = utils.replaceAllInString(type, "date", "Date");
        if (resolverInterface)
            resolverInterface.options[variable.name] = type;
        return { name: variable.name, type };
    });
    return { resolverInterface, varList };
};
exports.parseResolverVarlist = parseResolverVarlist;
//
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
          { type: ${type}, unique: true }
      `;
        return utils.replaceAllInString(uniqueVarString, "\n", "");
    };
    const checkIfUniqueVar = (varb, uniqueList) => {
        return uniqueList
            .map((variable) => variable.split(":")[0].toLowerCase())
            .includes(varb);
    };
    let varList = utils.splitNameType(vars);
    const schemaInterface = {};
    if (!Array.isArray(varList))
        return { importList: [], varList };
    varList = varList.map((variable) => {
        let type = utils.removeLastWordFromString(variable.type, ["Type", "Input"]);
        if (exports.isCustomType(type)) {
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
const parseTypeDefVarlist = (vars, name) => {
    const varList = utils.splitNameType(vars);
    const typeDefAsInterface = vars.length < 3 ? undefined : {};
    // if we have more than three properties, create a type definition especially for the custom type.
    // else, we'll just add the properties as params in the query/mutation.
    if (!Array.isArray(varList))
        return { varList: [], typeDefInterface: typeDefAsInterface };
    const variableStringList = varList.map((variable) => {
        const { type, name } = variable;
        if (exports.isCustomType(type)) {
            if (typeDefAsInterface)
                typeDefAsInterface[name] = type;
            // if it's a custom type, we want to leave it be and just add it to the definition.
            return `${name}:${type}`;
        }
        else {
            // if it's not, we want to capitalize it's first letter, as per GQL syntax.
            const capitalizedType = utils.capitalizeFirstLetter(type);
            if (typeDefAsInterface)
                typeDefAsInterface[name] = capitalizedType;
            return `${name}:${capitalizedType}`;
        }
    });
    if (typeDefAsInterface) {
        return {
            varList: `options: ${name}Options`,
            typeDefInterface: typeDefAsInterface,
        };
    }
    else
        return {
            varList: variableStringList,
            typeDefInterface: typeDefAsInterface,
        };
};
exports.parseTypeDefVarlist = parseTypeDefVarlist;
//takes a string[] of foo:type elements and parses it, returns varList - ['foo:Type', 'bar:Type'] and typeDefInterface.
