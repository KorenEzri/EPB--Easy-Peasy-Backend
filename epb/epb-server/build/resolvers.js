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
exports.resolvers = void 0;
const graphql_1 = require("graphql");
// TODO:
// CHECK BEST PRACTICE FOR WHERE TO STORE RESOLVER.TS AND TYPEDEF.TS
//  creating typeDef bugs: 1. typedef structure is nameOptions: { options: {}, kaki:string, ... }
// TODO:
//  - add prebuilt actions: {
//    - user auth - four days {
// -  TODO:
// -        - add option - i forgot what it was.. OH! add custom types to be available as return or receive types when creating interfaces
// -        - add auto export of schemas from index.ts of db schema folder.
// }
//    - CRUD operations for DB schema - four days
//    - Scalar type creator!! Then, add suppport for || in typedef creation as well.
// {
//////////// DUE: 01.07.21, Sunday. //////////////////
// TODO:
//  - code cleanup and tests
//  - add documentation, create a presentation
//////////// DUE: 05.07.21, Sunday. //////////////////
const validations_1 = require("./validations");
// option types end
const codeToString_1 = require("./utils/codeToString");
const utils = __importStar(require("./utils/utils"));
const create = __importStar(require("./utils/create"));
const add = __importStar(require("./utils/prebuiltActions"));
const logger_1 = __importDefault(require("./logger/logger"));
const dateScalar = new graphql_1.GraphQLScalarType({
    name: "Date",
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.toISOString();
    },
});
exports.resolvers = {
    Date: dateScalar,
    Query: {
        // Action: get all resolvers
        getResolvers: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield codeToString_1.getResolvers();
        }),
        // Action: get all type definitions
        getTypeDefs: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield codeToString_1.getTypeDefs();
        }),
        // Action: get all actions
        getActions: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield codeToString_1.getActions();
        }),
        // Action: get all resolver names
        getAllResolverNames: (_) => __awaiter(void 0, void 0, void 0, function* () {
            return yield codeToString_1.getResolverNames();
        }),
    },
    Mutation: {
        // Action: create a new resolver (empty)
        createResolver: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            const validationRes = yield validations_1.validateResolverCreation(options);
            if (validationRes.error)
                return validationRes.message;
            try {
                let error = yield create.createNewTypeDef({ options: options });
                if (error && error !== "OK")
                    return error;
                const resolverCreationRes = yield create.createNewResolver({
                    options: options,
                });
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    yield utils.restartServer();
                }), 1000);
                return resolverCreationRes;
            }
            catch ({ message }) {
                logger_1.default.error(`FROM: EPB-server: ${message}`);
                return message;
            }
        }),
        // Action: create a new type definition (singular)
        createCustomType: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            const validationRes = yield validations_1.validateTypeCreation(options);
            if (validationRes.error)
                return validationRes.message;
            try {
                const interfaceCreationRes = yield create.createNewInterface({
                    options: options,
                });
                yield utils.restartServer();
                return interfaceCreationRes;
            }
            catch ({ message }) {
                logger_1.default.error(`FROM: EPB-server: ${message}`);
                return message;
            }
        }),
        // Action: create a new database schema
        createSchema: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            const validationRes = yield validations_1.validateSchemaCreation({ options: options });
            if (validationRes.error)
                return `Creation of DB schema failed: ${validationRes.message}`;
            try {
                const schemaCreationRes = yield create.createDbSchema({
                    options: options,
                });
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    yield utils.restartServer();
                }), 1000);
                return schemaCreationRes;
            }
            catch ({ message }) {
                logger_1.default.error(`FROM: EPB-server: ${message}`);
                return message;
            }
        }),
        // Action: Add prebuilt action: User Auth
        addUserAuth: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield add.addUserAuthToBackend({ options: options });
            if (res)
                return "OK";
            //
            // return String
        }),
        // mutation-end
    },
};
