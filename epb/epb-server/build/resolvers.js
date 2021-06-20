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
const codeToString_1 = require("./utils/codeToString");
const create = __importStar(require("./utils/createNew"));
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
            logger_1.default.info("HERE2");
            return yield codeToString_1.getResolvers();
        }),
        // Action: get all type definitions
        getTypeDefs: () => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.default.info("HERE3");
            return yield codeToString_1.getTypeDefs();
        }),
        // Action: get all actions
        getActions: () => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.default.info("HERE4");
            return yield codeToString_1.getActions();
        }),
        // query-end
    },
    Mutation: {
        // Action: create a new resolver (empty)
        createResolver: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                logger_1.default.info("Creating a new type definition...");
                yield create.createNewTypeDef({ options: options });
                logger_1.default.info("Creating a new resolver...");
                yield create.createNewResolver({ options: options });
                logger_1.default.info("Action created successfully.");
                return "OK";
            }
            catch ({ message }) {
                logger_1.default.error(message);
                return "ERROR";
            }
        }),
        // Action: create a new type definition (singular)
        createCustomType: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            //
            // return String
        }),
        // mutation-end
    },
};
