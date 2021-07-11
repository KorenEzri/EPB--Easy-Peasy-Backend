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
exports.createNewTypeDef = void 0;
const util_1 = require("../prebuiltActions/crudOperations/mongodb/util");
const typeDefs_1 = require("../../typeDefs");
const codeToString_1 = require("../codeToString");
const util_2 = require("util");
const logger_1 = __importDefault(require("../../logger/logger"));
const fs_1 = __importDefault(require("fs"));
const utils = __importStar(require("../utils"));
const parseVars = __importStar(require("../utils/parse-vars"));
const write = util_2.promisify(fs_1.default.writeFile);
const allTypeDefinitions = typeDefs_1.typeDefs.definitions.map((definition) => definition.name.value.trim());
const grabTypeDefsAndInsertNewTypeDef = (name, properties, type, returnType, actionName) => __awaiter(void 0, void 0, void 0, function* () {
    const capType = utils.capitalizeFirstLetter(type || "");
    let { typeDef, typeDefInterface } = yield fromOptionsToGQLTypeDefinition(
    /*
    This function returns varList - either an array, or a stringified represntation of name:type in case of having only one option.
    it also returns typeDefInterface - which is either undefined, or an object, represting a whole type definition interface
    for GraphQL.
    */
    name, properties, capType, returnType, actionName);
    const allTypeDefsAsString = yield codeToString_1.getTypeDefs(); // current typeDef file as string
    if (!allTypeDefsAsString)
        return "Error with utils/createNew/createTypeDef.ts, getTypeDefs() returned undefined!";
    const typeDefLineArray = utils.toLineArray(allTypeDefsAsString);
    if (!actionName &&
        // check if typeDef already exists vv
        (typeDefLineArray.includes(typeDef) ||
            utils.isCustomType(`${name}Options`) ||
            allTypeDefinitions.includes(`${name.trim()}Options`))) {
        // check if typeDef is a custom type vv
        if (type && utils.isCustomType(`${name}Options${capType}`)) {
            return { error: "Duplicate type definitions detected, aborting.." };
        }
        // if it's not a custom type, but already exists, also abort. vv
        return { error: "Duplicate type definitions detected, aborting.." };
    }
    else {
        // add it to custom types and validation lists so the validation list is updated without having to restart the server
        // (because new files were created, and now, it IS in fact a custom type, unlike before.)
        utils.addToCustomTypes(name.trim(), capType);
        allTypeDefinitions.push(`${name.trim()}Options`);
        allTypeDefinitions.push(`${name.trim()}Options${capType}`);
    }
    let finishedTypeDefs = yield insertTypeDefInterface(
    // this inserts the interface to the typeDef string.
    allTypeDefsAsString, name, typeDefInterface, type, returnType);
    let typeInsertEndIndex = type === "Query" ? "# query-end" : "# mutation-end";
    typeInsertEndIndex = utils
        .toLineArray(finishedTypeDefs)
        .map((line) => line.trim())
        .indexOf(typeInsertEndIndex);
    if (actionName)
        typeDef = actionName + utils.capitalizeFirstLetter(typeDef);
    if (returnType) {
        finishedTypeDefs = utils.pushIntoString(finishedTypeDefs, typeInsertEndIndex, 0, typeDef);
    }
    return finishedTypeDefs;
});
const fromOptionsToGQLTypeDefinition = (name, properties, type, returnType, actionName) => __awaiter(void 0, void 0, void 0, function* () {
    const typeDefForManyObjects = (actionName === null || actionName === void 0 ? void 0 : actionName.toLowerCase().includes("many")) ||
        (actionName === null || actionName === void 0 ? void 0 : actionName.toLowerCase().includes("all"))
        ? true
        : false;
    // Function receives the name of the type Def, the list of it's properties, and it's returntype (optional)
    const { varList, typeDefInterface } = parseVars.parseTypeDefVarlist(
    /*
    This function returns varList - either an array, or a stringified represntation of name:type in case of having only one option.
    it also returns typeDefInterface - which is either undefined, or an object, represting a whole type definition interface
    for GraphQL.
    */
    properties, name);
    if (returnType) {
        if (!utils.isCustomType(returnType)) {
            returnType = utils.capitalizeFirstLetter(returnType);
        }
    }
    let typeDef;
    if (!Array.isArray(varList)) {
        /* if varList is not an array, that means we only have one variable to handle,
         so it's placed inside the Query/Mutation definition itself.
         if the varList is an array, we use typeDefInterface, and it will be inserted later.
        */
        returnType
            ? (typeDef = `${name}${typeDefForManyObjects ? "s" : ""}(${varList}): ${returnType}`)
            : (typeDef = `${type.toLowerCase()} ${name} {${varList}}`);
        /* this^^^^ is like:
                      getMessageOptions(message: messageOptionsInput): messageOptionsType
        */
    }
    else if (varList.length === 0) {
        return {
            typeDef: `${name}${typeDefForManyObjects ? "s" : ""}: ${returnType}`,
            typeDefInterface,
        };
    }
    else {
        typeDef = `${name}${typeDefForManyObjects ? "s" : ""}: ${returnType}`; // this <<< is like:
        // getMessageOptions: messsageOptionsType
        // later, it will get the typeDefInterface options added to it.
    }
    return { typeDef, typeDefInterface };
});
const insertTypeDefInterface = (typeDefs, name, typeDefInterface, type, returnType) => __awaiter(void 0, void 0, void 0, function* () {
    // insert the type definition to the typeDef file string.
    let interfacePreFix;
    // every graphQL interface has a prefix: either 'type' or 'input'.
    // Queries get 'type', while Mutations get 'input'.
    type === "Query"
        ? (interfacePreFix = "type")
        : type === "type"
            ? (interfacePreFix = type)
            : type === "input"
                ? (interfacePreFix = "input")
                : (interfacePreFix = "type");
    if (returnType)
        interfacePreFix = "input";
    const handlerA = "# generated definitions"; // handler for position to insert typeDef
    const interfaceString = JSON.stringify(typeDefInterface, null, 2);
    /*
    does interfaceString exist? if so, create something like:
     
    type fooOptionsType {
      foo: String
      bar: [Int]
    }
    # added at: 06.30.2021..
  
    if interfaceString doesn't exist, don't create an interface!
  
    */
    let typeDef = interfaceString
        ? `\n ${interfacePreFix} ${name}Options${utils.capitalizeFirstLetter(interfacePreFix)} ${interfaceString}\n# added at: ${new Date()}`
        : undefined;
    typeDef = utils.replaceAllInString(typeDef || "", ['"', "Number", ";"], ["", "Int", ""]
    // self-explanatory - GQL needs type "Int", not "Number", but for comfort, users can input both.
    );
    const checkForDuplicates = yield utils.checkIfLinesAlreadyExist(typeDef, undefined, typeDefs);
    if (checkForDuplicates.error)
        typeDef = "";
    const finishedTypeDefs = utils.pushIntoString(
    // push into a string:
    typeDefs, // All old typeDefs file as string, we are pushing to this string.
    handlerA, // handlerA - # generated definitions - for positioning.
    0, // handlerB for pushIntoString() function - meaning, add the string we want to add, but delete nothing.
    typeDef // the string to push - typeDef.
    );
    return finishedTypeDefs;
});
const createNewTypeDef = ({ options, }) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http("FROM: EPB-server: Creating a new type definition...");
    try {
        const res = yield grabTypeDefsAndInsertNewTypeDef(options.name, options.properties, options.type, options.returnType, options.actionName);
        // calls fromOptionsToGQLTypeDefinition()
        if (!res || res.error) {
            logger_1.default.error(`Error creating type definition! ${res.error}`);
            if (res.error)
                return res.error;
            return res;
        }
        yield write("./typeDefs.ts", res);
        if (options.properties.length > 1) {
            yield addToConfigFile(options.name);
        }
        if (options.returnType) {
            yield utils.alterConfigFile("add", "typeDefActions", options.name);
        }
        return "OK";
    }
    catch ({ message }) {
        logger_1.default.error(`From: EPB-server: Error creating type definition, ${message}`);
        return message;
    }
});
exports.createNewTypeDef = createNewTypeDef;
const addToConfigFile = (typeName) => __awaiter(void 0, void 0, void 0, function* () {
    const names = getNamesFromTypeName(typeName);
    yield utils.alterConfigFile("add", "typeDefInterfaces", names.typeDefInterfaceName);
});
const getActionName = (typeName, action) => {
    if (!action)
        return;
    action = utils.lowercaseFirstLetter(action.split(" ").join(""));
    if (action.includes("Many"))
        return `${action}${typeName}s`;
    return `${action}${typeName}`;
};
const getTypedefInterfaceName = (typeName, action) => {
    if (!action)
        action = "";
    action = action.split(" ").join("");
    if (util_1.mutationCRUDS.includes(action)) {
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
