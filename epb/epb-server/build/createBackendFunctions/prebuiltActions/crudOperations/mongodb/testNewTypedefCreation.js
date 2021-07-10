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
exports.createTypedef = void 0;
const mongoUtils = __importStar(require("./util"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const utils = __importStar(require("../../../utils"));
const createTypeDefUtils = __importStar(require("./testTypedefCreationutils"));
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
////
const checkIfActionRequiresIdentifier = (actionName, modelName, fromSource) => {
    const deleteAndReadActionNames = [
        "deleteone",
        "deletemany",
        "readone",
        "readmany",
    ];
    actionName = actionName || "";
    if (fromSource) {
        return deleteAndReadActionNames.includes(actionName);
    }
    const removeModelName = `${modelName === null || modelName === void 0 ? void 0 : modelName.split("Model").join("")}`;
    const actionNameWithoutModelName = actionName === null || actionName === void 0 ? void 0 : actionName.toLowerCase().split(removeModelName)[0];
    return deleteAndReadActionNames.includes(actionNameWithoutModelName || "");
};
////
////
const insertToTypedefs = (typeDefInterface, typeDefAction, type, typeAndInput, extraTypeDefInterfaceObj) => __awaiter(void 0, void 0, void 0, function* () {
    const typeDefsAsString = yield read("typeDefs.ts", "utf8");
    const handlerA = type === "input" || type === "Mutation" ? "# mutation-end" : "# query-end";
    let typeDefs = utils.pushIntoString(typeDefsAsString, handlerA, 0, typeDefAction || "", undefined, -1);
    typeDefs = utils.pushIntoString(typeDefs, "# generated definitions", 0, typeDefInterface || extraTypeDefInterfaceObj || "");
    if (typeAndInput) {
        const splatInterface = typeDefInterface === null || typeDefInterface === void 0 ? void 0 : typeDefInterface.split("{");
        if (splatInterface) {
            let firstLine = splatInterface[0];
            firstLine = utils.replaceAllInString(firstLine || "", ["input", "Input"], ["type", "Type"]);
            splatInterface[0] = firstLine;
            typeDefInterface = splatInterface.join("{");
            typeDefs = utils.pushIntoString(typeDefs, "# generated definitions", 0, typeDefInterface || "");
        }
    }
    yield write("typeDefs.ts", typeDefs);
});
////
///////
/////// Typedef creation utils ////////
////
const createStringifiedTypedefInterfaceObj = (varList) => {
    const areAllTypesCustomTypes = utils.checkIfAllTypesAreCustomTypes(varList);
    const cleanTypedefInterface = (typeDefInterface) => {
        typeDefInterface = JSON.stringify(typeDefInterface, null, 2);
        typeDefInterface = utils.replaceAllInString(typeDefInterface, '"', "");
        return typeDefInterface;
    };
    const typeDefInterface = {};
    varList.forEach((variable) => {
        const { name, type } = variable;
        if (!name)
            return;
        typeDefInterface[name] = areAllTypesCustomTypes
            ? type
            : utils.parseSingleTypedefVariable(variable);
    });
    return cleanTypedefInterface(typeDefInterface);
};
const getTypedefInterfaceVariables = (properties) => {
    return Array.isArray(properties) && properties.length >= 1
        ? createStringifiedTypedefInterfaceObj(properties)
        : undefined;
};
const getTypeDefActionVariables = (properties, names) => {
    return Array.isArray(properties) && properties.length >= 1
        ? `(options: ${names === null || names === void 0 ? void 0 : names.typeDefInterfaceName})`
        : Array.isArray(properties)
            ? `${properties[0].name}:${properties[0].type}`
            : checkIfActionRequiresIdentifier(names === null || names === void 0 ? void 0 : names.actionName, names === null || names === void 0 ? void 0 : names.modelName)
                ? `(${properties === null || properties === void 0 ? void 0 : properties.name}:${utils.capitalizeFirstLetter((properties === null || properties === void 0 ? void 0 : properties.type) || "")})`
                : undefined;
};
const getInitialTypeDefInterface = (interfacePrefix, names, properties, forReadCRUDAction) => {
    if (forReadCRUDAction)
        interfacePrefix = "type";
    const typeDefInterfaceName = `${interfacePrefix} ${names === null || names === void 0 ? void 0 : names.typeDefInterfaceName}`;
    const typeDefInterfaceVariables = getTypedefInterfaceVariables(properties);
    let typeDefInterface = typeDefInterfaceVariables
        ? typeDefInterfaceName + typeDefInterfaceVariables
        : "";
    typeDefInterface = utils.replaceAllInString(typeDefInterface, ["number", "Number"], ["Int", "Int"]);
    return typeDefInterface;
};
const getReturnType = (names, returnType) => {
    return (names === null || names === void 0 ? void 0 : names.actionName) && names.actionName.includes("Many")
        ? `${[returnType]}`
        : returnType;
};
const getTypeDefAction = (names, returnType, typeDefActionVariables) => {
    return returnType
        ? `${names === null || names === void 0 ? void 0 : names.actionName}${typeDefActionVariables || ""}: ${returnType}`
        : undefined;
};
const getTypeDefInterfaceAndAction = (setupOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { names, properties, interfacePrefix, propertiesForTypeInterface } = setupOptions;
    let { returnType } = setupOptions;
    let typeDefInterface = getInitialTypeDefInterface(interfacePrefix, names, properties);
    let extraTypeDefInterfaceObj;
    if (propertiesForTypeInterface) {
        extraTypeDefInterfaceObj = getInitialTypeDefInterface(interfacePrefix, names, propertiesForTypeInterface, true);
    }
    const typeDefActionVariables = getTypeDefActionVariables(properties, names);
    returnType = getReturnType(names, returnType);
    const typeDefAction = getTypeDefAction(names, returnType, typeDefActionVariables);
    const doesInterfaceExist = yield utils.checkIfConfigItemExists("typeDefInterfaces", (names === null || names === void 0 ? void 0 : names.typeDefInterfaceName) || "");
    if (doesInterfaceExist) {
        typeDefInterface = "";
        extraTypeDefInterfaceObj = "";
    }
    return { typeDefInterface, typeDefAction, extraTypeDefInterfaceObj };
});
////
const arrangeSchemaConfigFile = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { inputAndType, typeDefInterfaceTypeName, typeDefInterfaceLength, names, typeDefAction, } = options;
    if (inputAndType) {
        yield utils.alterConfigFile("add", "typeDefInterfaces", typeDefInterfaceTypeName);
    }
    if ((names === null || names === void 0 ? void 0 : names.typeDefInterfaceName) || typeDefInterfaceLength > 0) {
        yield utils.alterConfigFile("add", "typeDefInterfaces", (names === null || names === void 0 ? void 0 : names.typeDefInterfaceName) || "");
    }
    if ((names === null || names === void 0 ? void 0 : names.actionName) && typeDefAction) {
        yield utils.alterConfigFile("add", "typeDefActions", names.actionName);
        yield utils.alterConfigFile("add", "resolvers", names.actionName);
    }
});
/////// Typedef creation utils ////////
const createTypedefFromClientOptions = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const setupOptions = createTypeDefUtils.setUpOptions(options);
    const { names, type } = setupOptions;
    let { typeDefInterface, typeDefAction, extraTypeDefInterfaceObj } = yield getTypeDefInterfaceAndAction(setupOptions);
    const typeDefInterfaceTypeName = utils.replaceAllInString((names === null || names === void 0 ? void 0 : names.typeDefInterfaceName) || "", "Input", "Type") || "";
    const inputAndType = yield utils.checkIfConfigItemExists("typeDefInterfaces", typeDefInterfaceTypeName);
    yield insertToTypedefs(typeDefInterface, typeDefAction, type || "type", !inputAndType, extraTypeDefInterfaceObj);
    const typeDefInterfaceLength = typeDefInterface.length;
    const arrangeSchemaConfigFileOptions = {
        inputAndType,
        typeDefInterfaceTypeName,
        typeDefInterfaceLength: typeDefInterfaceLength
            ? typeDefInterfaceLength
            : (extraTypeDefInterfaceObj === null || extraTypeDefInterfaceObj === void 0 ? void 0 : extraTypeDefInterfaceObj.length) || 0,
        names,
        typeDefAction,
    };
    yield arrangeSchemaConfigFile(arrangeSchemaConfigFileOptions);
});
///////
////
const getTypescriptInterfaceFromModelName = (model) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = `types/${model}Options.ts`;
    const interfaceFileLineArray = utils.toLineArray(yield read(filePath, "utf8"));
    const typeDefInterface = {};
    let startIndex = -2, endIndex = -2;
    interfaceFileLineArray.forEach((line) => {
        if (line.includes("export interface") && startIndex === -2) {
            startIndex = interfaceFileLineArray.indexOf(line);
        }
        else if (line.includes("// added at:") && endIndex === -2) {
            endIndex = interfaceFileLineArray.indexOf(line);
        }
    });
    typeDefInterface.properties = interfaceFileLineArray
        .slice(startIndex + 2, endIndex - 2)
        .map((line) => utils.replaceAllInString(line.trim(), ",", ""));
    return typeDefInterface;
});
const createTypedefClientOptionsFromFileOptions = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, action, modelName } = options;
    const modelNameOnly = utils.replaceAllInString(modelName, "Schema", "");
    const typeDefInterface = yield getTypescriptInterfaceFromModelName(modelNameOnly);
    const lowerCaseAction = action.toLowerCase();
    const mutationQuery = mongoUtils.mutationCRUDS.includes(action);
    const returnType = mutationQuery
        ? "String"
        : lowerCaseAction.includes("many") || lowerCaseAction.includes("all")
            ? `[${utils.lowercaseFirstLetter(modelNameOnly)}OptionsType]`
            : `${utils.lowercaseFirstLetter(modelNameOnly)}OptionsType`;
    const type = mutationQuery ? "Mutation" : "Query";
    const requiresIdentifier = checkIfActionRequiresIdentifier(lowerCaseAction, modelNameOnly, true);
    let propertiesForOptions = mutationQuery
        ? typeDefInterface.properties
        : undefined;
    let propertiesForTypeInterface;
    if (requiresIdentifier) {
        propertiesForOptions = `${identifier.name}: ${identifier.type}`;
        if (lowerCaseAction.includes("read")) {
            propertiesForTypeInterface = typeDefInterface.properties;
        }
    }
    // BUG: When creating a "Read One" query, it doesn't create the requirred "moveOptionsType" that is the return type of this query.
    // this happens because properties is now just a string. my attempt at line 296 is to fix this with an extra prop inside optionsFromClient interface.
    const createCustomTypeOptions = {
        properties: propertiesForOptions,
        name: modelNameOnly,
        comment: "Custom type created by CRUD generator",
        dbSchema: true,
        typeDef: true,
        returnType,
        type,
        actionName: action,
        propertiesForTypeInterface,
    };
    return createCustomTypeOptions;
});
////
////
const handleOptions = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const typeDefFromClientOptions = yield createTypedefClientOptionsFromFileOptions(options);
    yield createTypedefFromClientOptions(typeDefFromClientOptions);
});
////
////
const createTypedef = (options) => __awaiter(void 0, void 0, void 0, function* () {
    yield handleOptions(options);
});
exports.createTypedef = createTypedef;
////
