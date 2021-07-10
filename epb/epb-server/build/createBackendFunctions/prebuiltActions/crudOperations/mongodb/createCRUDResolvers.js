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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolverFromOpts = void 0;
const mongoUtils = __importStar(require("./util"));
const utils = __importStar(require("../../../utils"));
const util_1 = require("./util");
const parseIdentifierType = (type) => {
    type = type.toLowerCase();
    if (type === "array") {
        return `any[]`;
    }
    else if (type === "object") {
        return `any`;
    }
    else
        return type;
};
const buildResolvers = (action, options) => {
    var _a;
    const { title, body } = options;
    const identifierType = (_a = title.identifier) === null || _a === void 0 ? void 0 : _a.type;
    if (identifierType && title.identifier) {
        const type = title.identifier.type;
        title.identifier.type = parseIdentifierType(type);
    }
    switch (action.split(" ").join("")) {
        case "CreateOne":
            const createOneTitle = util_1.resolverTitles.createOne(title);
            const createOneBody = util_1.resolverBodies.createOne(body);
            return createOneTitle + createOneBody;
        case "CreateMany":
            const createManyTitle = util_1.resolverTitles.createMany(title);
            const createManyBody = util_1.resolverBodies.createMany(body);
            return createManyTitle + createManyBody;
        case "ReadOne":
            const readOneTitle = util_1.resolverTitles.readOne(title);
            const readOneBody = util_1.resolverBodies.readOne(body);
            return readOneTitle + readOneBody;
        case "ReadMany":
            const readManyTitle = util_1.resolverTitles.readMany(title);
            const readManyBody = util_1.resolverBodies.readMany(body);
            return readManyTitle + readManyBody;
        case "ReadAll":
            const readAllTitle = util_1.resolverTitles.readAll(title);
            const readAllBody = util_1.resolverBodies.readAll(body);
            return readAllTitle + readAllBody;
        case "UpdateOne":
            const updateOneTitle = util_1.resolverTitles.updateOne(title);
            const updateOneBody = util_1.resolverBodies.updateOne(body);
            return updateOneTitle + updateOneBody;
        case "UpdateMany":
            return "";
        case "DeleteOne":
            const deleteOneTitle = util_1.resolverTitles.deleteOne(title);
            const deleteOneBody = util_1.resolverBodies.deleteOne(body);
            return deleteOneTitle + deleteOneBody;
        case "DeleteMany":
            const deleteManyTitle = util_1.resolverTitles.deleteMany(title);
            const deleteManyBody = util_1.resolverBodies.deleteMany(body);
            return deleteManyTitle + deleteManyBody;
        default:
            return "ERROR";
    }
};
const parseResolverInfo = (options) => {
    const { Model, action, identifier } = options;
    const capitalizedModelSchemaName = utils.capitalizeFirstLetter(Model);
    const lowercasedModelSchemaame = utils.lowercaseFirstLetter(Model);
    const modelFunctionVarName = utils.replaceAllInString(lowercasedModelSchemaame, "Schema", "");
    const mongoDBModelObjectName = utils.replaceAllInString(capitalizedModelSchemaName, "Schema", "Model");
    const modelInstaceName = `${modelFunctionVarName}Instance`;
    const modelInterfaceName = `${modelFunctionVarName}Options`;
    const resolverName = mongoUtils.generateResolverName(Model, action);
    const mongooseMethod = mongoUtils.getMongooseMethod(action.split(" ").join(""), identifier, modelFunctionVarName);
    return {
        resolverName,
        modelInterfaceName,
        modelInstaceName,
        modelFunctionVarName,
        mongoDBModelObjectName,
        mongooseMethod,
    };
};
const getTryCatchBlock = (action, options) => {
    switch (action.split(" ").join("")) {
        case "CreateOne":
            return util_1.resolverTryCatchBlocks.createOne(options);
        case "CreateMany":
            return util_1.resolverTryCatchBlocks.createMany(options);
        case "ReadOne":
            return util_1.resolverTryCatchBlocks.readOne(options);
        case "ReadMany":
            return util_1.resolverTryCatchBlocks.readMany(options);
        case "ReadAll":
            return util_1.resolverTryCatchBlocks.readAll(options);
        case "UpdateOne":
            return util_1.resolverTryCatchBlocks.updateOne(options);
        case "UpdateMany":
            return "NOT SUPPORTED";
        case "DeleteOne":
            return util_1.resolverTryCatchBlocks.deleteOne(options);
        case "DeleteMany":
            return util_1.resolverTryCatchBlocks.deleteMany(options);
        default:
            return "ERR";
    }
};
const createResolverFromOpts = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const parts = parseResolverInfo(options);
    const { action, identifier, resolverType } = options;
    const titleOptions = {
        resolverName: parts.resolverName,
        modelFunctionVarName: parts.modelFunctionVarName,
        modelInterfaceName: parts.modelInterfaceName,
        identifier,
    };
    const tryCatchBlockOptions = {
        modelInstaceName: parts.modelInstaceName,
        mongoDBModelObjectName: parts.mongoDBModelObjectName,
        modelFunctionVarName: parts.modelFunctionVarName,
        mongooseMethod: parts.mongooseMethod,
        identifier,
    };
    const resolverTryCatchBlock = getTryCatchBlock(action, tryCatchBlockOptions);
    const bodyOptions = {
        modelInstaceName: parts.modelInstaceName,
        mongoDBModelObjectName: parts.mongoDBModelObjectName,
        modelFunctionVarName: parts.modelFunctionVarName,
        resolverTryCatchBlock,
        mongooseMethod: parts.mongooseMethod,
        identifier,
    };
    const resolver = buildResolvers(action, {
        title: titleOptions,
        body: bodyOptions,
    });
    yield mongoUtils.writeResolverIntoFile(`${resolver}},`, resolverType);
});
exports.createResolverFromOpts = createResolverFromOpts;
