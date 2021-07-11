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
exports.createActionDefinition = exports.setUpOptions = void 0;
const mongoUtils = __importStar(require("./util"));
const utils = __importStar(require("../../../utils"));
const setType = (type) => {
    return utils.capitalizeFirstLetter(type);
};
const getActionName = (typeName, action) => {
    if (!action)
        return;
    action = utils.lowercaseFirstLetter(action.split(" ").join(""));
    if (action.includes("Many") || action.includes("All"))
        return `${action}${utils.capitalizeFirstLetter(typeName)}s`;
    return `${action}${utils.capitalizeFirstLetter(typeName)}`;
};
const getInterfacePrefix = (type) => {
    type = type.toLowerCase();
    return type === "type" || type === "query" ? "type" : "input";
};
const getTypedefInterfaceName = (typeName, action) => {
    if (!action)
        action = "";
    action = action === null || action === void 0 ? void 0 : action.split(" ").join("");
    if (mongoUtils.mutationCRUDS.includes(action)) {
        return `${typeName}OptionsInput`;
    }
    else
        return `${typeName}OptionsType`;
};
const getNamesFromTypeName = (typeName, action) => {
    const schemaName = `${typeName}Schema`;
    const modelName = `${typeName}Model`;
    const customTypeName = `${typeName}Options`;
    const actionName = getActionName(typeName, action);
    const typeDefInterfaceName = getTypedefInterfaceName(typeName, action);
    return {
        schemaName,
        modelName,
        customTypeName,
        actionName,
        typeDefInterfaceName,
    };
};
const setUpOptions = (options) => {
    const { properties, name, actionName, comment, returnType, propertiesForTypeInterface, } = options;
    let { type } = options;
    if (!type || propertiesForTypeInterface)
        type = "type";
    let revampedOpts = {};
    const interfacePrefix = getInterfacePrefix(type);
    revampedOpts.type = setType(type);
    revampedOpts.properties = utils.splitNameType(properties);
    revampedOpts.names = getNamesFromTypeName(name, actionName);
    revampedOpts.comment = comment;
    revampedOpts.interfacePrefix = interfacePrefix;
    revampedOpts.propertiesForTypeInterface = propertiesForTypeInterface
        ? utils.splitNameType(propertiesForTypeInterface)
        : undefined;
    if (returnType)
        revampedOpts.returnType = returnType;
    return revampedOpts;
};
exports.setUpOptions = setUpOptions;
const createActionDefinition = () => { };
exports.createActionDefinition = createActionDefinition;
