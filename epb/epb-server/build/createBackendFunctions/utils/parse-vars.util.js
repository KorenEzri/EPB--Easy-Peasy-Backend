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
exports.parseSingleTypedefVariable = exports.checkIfAllTypesAreCustomTypes = exports.parseArrayOperatorTypes = exports.addToCustomTypes = exports.isCustomType = void 0;
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
const addToCustomTypes = (name, gqlType) => {
    consts_1.allCustomTypesWithArrayTypes.push(name);
    consts_1.allCustomTypesWithArrayTypes.push(`${name}[]`);
    consts_1.allCustomTypesWithArrayTypes.push(`[${name}]`);
    consts_1.allCustomTypesWithArrayTypes.push(`${name}Options`);
    consts_1.allCustomTypesWithArrayTypes.push(`${name}Options[]`);
    consts_1.allCustomTypesWithArrayTypes.push(`[${name}Options]`);
    consts_1.allCustomTypesWithArrayTypes.push(`${name}Options${gqlType}[]`);
    consts_1.allCustomTypesWithArrayTypes.push(`[${name}Options${gqlType}]`);
    consts_1.allCustomTypesWithArrayTypes.push(`[${name}Options${gqlType}]`);
};
exports.addToCustomTypes = addToCustomTypes;
const parseArrayOperatorTypes = (type, gqlArray) => {
    if (type.includes("[") && type.includes("]")) {
        let typeString = type.split("[").join("").split("]");
        typeString = gqlArray ? `[${typeString.join("")}]` : typeString + "[]";
        typeString = gqlArray ? typeString : typeString.split(",").join("");
        return typeString;
    }
    else
        return type;
};
exports.parseArrayOperatorTypes = parseArrayOperatorTypes;
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
exports.checkIfAllTypesAreCustomTypes = checkIfAllTypesAreCustomTypes;
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
exports.parseSingleTypedefVariable = parseSingleTypedefVariable;
