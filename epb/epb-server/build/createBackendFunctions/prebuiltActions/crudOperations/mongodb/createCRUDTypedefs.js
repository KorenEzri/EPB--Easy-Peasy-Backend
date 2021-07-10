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
exports.createnewTypedef = void 0;
const mongoUtils = __importStar(require("./util"));
const util_1 = require("util");
const logger_1 = __importDefault(require("../../../../logger/logger"));
const fs_1 = __importDefault(require("fs"));
const utils = __importStar(require("../../../utils"));
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
const getType = (type) => {
    return type === "Query"
        ? "type"
        : type === "Mutation"
            ? "input"
            : type
                ? type
                : "input";
};
const getTypedefInterfaceFromModelName = (model) => __awaiter(void 0, void 0, void 0, function* () {
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
const generateCustomTypeOptions = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const modelNameOnly = utils.replaceAllInString(options.Model, "Schema", "");
    const typeDefInterface = yield getTypedefInterfaceFromModelName(modelNameOnly);
    const lowerCaseAction = options.action.toLowerCase();
    const mutationQuery = mongoUtils.mutationCRUDS.includes(options.action);
    const returnType = mutationQuery
        ? "String"
        : lowerCaseAction.includes("many") || lowerCaseAction.includes("all")
            ? `[${utils.lowercaseFirstLetter(modelNameOnly)}OptionsType]`
            : `${utils.lowercaseFirstLetter(modelNameOnly)}OptionsType`;
    const type = mutationQuery ? "Mutation" : "Query";
    const createCustomTypeOptions = {
        options: {
            properties: mutationQuery ? typeDefInterface.properties : undefined,
            name: modelNameOnly,
            comment: "Custom type created by CRUD generator",
            dbSchema: true,
            typeDef: true,
            returnType,
            type,
            tsInterface: "no",
            actionName: utils.lowercaseFirstLetter(options.action),
        },
    };
    return createCustomTypeOptions;
});
const createOnlyInlineVarlist = (varList, allTypesAreCustomTypes, definitionName, definitionType) => {
    let inlineVarlist;
    if (varList.length > 1) {
        // if it is > 1 that means we'll have a special interface for it, so we'll just call for it in the options: fooOptionsInput thing.
        inlineVarlist = `options: ${definitionName}Options${utils.capitalizeFirstLetter(definitionType)}`;
    }
    else {
        const { name, type } = varList[0];
        inlineVarlist = allTypesAreCustomTypes
            ? `(${name}: ${type})` // if all types are custom types, you really don't wanna change their names.
            : `(${name}:${utils.parseSingleTypedefVariable(varList[0])})`; // else, do that magic.
    }
    return inlineVarlist;
};
const createTypedefInterfaceVarListAndInlineVarlist = (varList, objectName, returnsArray, allTypesAreCustomTypes, returnType) => {
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
        typeDefInterface[name] = allTypesAreCustomTypes
            ? type
            : utils.parseSingleTypedefVariable(variable);
    });
    const returnTypePostfix = allTypesAreCustomTypes ? "" : "Type";
    const varListReturnType = returnType
        ? returnType
        : returnsArray
            ? `[${objectName}Options${returnTypePostfix}]`
            : `${objectName}Options${returnTypePostfix}`;
    return {
        inlineVarlist: `(options: ${objectName}OptionsInput): ${varListReturnType}`,
        typeDefInterface: cleanTypedefInterface(typeDefInterface),
    };
};
const createTypedefVarList = ({ options }) => {
    const { properties, name, actionName, type, returnType } = options;
    let varList = utils.splitNameType(properties); // return a list of { name: foo, type: string } .
    Array.isArray(varList) ? varList : (varList = [varList]);
    const areAllTypesCustomTypes = utils.checkIfAllTypesAreCustomTypes(varList);
    // check if handling only custom types
    const moreThanOneVarInVarlist = varList.length > 1 ? true : false;
    // check if there's more than one variable for the varList to determine the need for an interface.
    const returnsArray = (actionName === null || actionName === void 0 ? void 0 : actionName.includes("Many")) || (actionName === null || actionName === void 0 ? void 0 : actionName.includes("All")) ? true : false;
    // check if the type definition acting is supposed to return an array of something.
    const definitionType = getType(type);
    const definitionReturnType = returnType ? returnType : "String";
    if (moreThanOneVarInVarlist) {
        // if more than one variable is required we need to create a typedef interface for it AND an inline type definition for options.
        return createTypedefInterfaceVarListAndInlineVarlist(varList, name, returnsArray, areAllTypesCustomTypes, definitionReturnType);
        // returns { inlineVarlist, typedefInterface }
    }
    else {
        const inlineVarlist = createOnlyInlineVarlist(
        // that will be the inline options:  querySomething(  >> options: fooOptionsInput <<  ): returnType
        varList, areAllTypesCustomTypes, name, definitionType);
        return { inlineVarlist, typeDefInterface: undefined };
    }
};
const createFirstLineOfTypedefInterface = ({ options, }) => {
    let { type, name } = options;
    type = getType(type);
    return `${type} ${name}Options${utils.capitalizeFirstLetter(type || "")}`;
};
const createTypedefInterface = (options) => {
    const firstLine = createFirstLineOfTypedefInterface(options);
    const { inlineVarlist, typeDefInterface } = createTypedefVarList(options);
    const fullInterface = typeDefInterface
        ? firstLine + typeDefInterface
        : undefined;
    return {
        fullInterface,
        inlineVarlist,
    };
};
const insertToTypedefs = (typeDefInterface, queryOrMutationDefinition, type) => __awaiter(void 0, void 0, void 0, function* () {
    const typeDefsAsString = yield read("typeDefs.ts", "utf8");
    const handlerA = type === "input" || "Mutation" ? "# mutation-end" : "# query-end";
    let typeDefs = utils.pushIntoString(typeDefsAsString, handlerA, 0, queryOrMutationDefinition);
    typeDefs = utils.pushIntoString(typeDefs, "# generated definitions", 0, typeDefInterface || "");
    yield write("typeDefs.ts", typeDefs);
});
const createnewTypedef = (options) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new type definition...");
    const interfaceOptions = yield generateCustomTypeOptions(options.options);
    const { inlineVarlist, fullInterface } = createTypedefInterface(interfaceOptions);
    let { type, name } = interfaceOptions.options;
    if (!type)
        type = "Query";
    type = getType(type);
    const typeDefInterface = fullInterface
        ? JSON.stringify(fullInterface, null, 2)
        : undefined;
    const typeDefActionName = yield insertToTypedefs(typeDefInterface, inlineVarlist, type);
});
exports.createnewTypedef = createnewTypedef;
/*
    inlineVarlist is what comes after the Query or Mutation declaration as options for that Query/Mutation.
    for example: deleteAllMessages(options: deleteAllMessagesOptionsInput): String;
    In this Mutation definition, " options: deleteAllMessagesOptionsInput " is our inlineVarlist.
    " deleteAllMessagesOptionsInput " is our typeDef interace, or "fullInterface" variable.

    Sometimes we will not need a whole interface for options, as there will be only one variable (or there won't be any at all) -
    that's when we'll get a query more like the following:

    getAllMessagesByDate(date: Date): [messageOptionsType] ;
    in this case, inlineVarlist is " (date: Date) ".
    */
