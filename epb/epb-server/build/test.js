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
exports.resolvers = void 0;
const graphql_1 = require("graphql");
const codeToString_1 = require("./utils/codeToString");
const create = __importStar(require("./utils/createNew"));
// added at: Sun Jun 20 2021 13:36:49 GMT+0300 (Israel Daylight Time)
// generated interfaces end
//
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
        getResolvers: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield codeToString_1.getResolvers(); // Action: get all resolvers
        }),
        getTypeDefs: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield codeToString_1.getTypeDefs(); // Action: get all type definitions
        }),
        getActions: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield codeToString_1.getActions(); // Action: get all actions
        }),
        // query-end
    },
    Mutation: {
        createResolver: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            yield create.createNewTypeDef({ options: options });
            yield create.createNewResolver({ options: options });
            return "OK"; // Action: create a new resolver (empty)
        }),
        GetCars: (_, { options }) => __awaiter(void 0, void 0, void 0, function* () {
            // const o22222ne = 1;
            let count = 3;
            console.log("one + count", 'HEY!');
            // test run!2
            // return [Number]
        }),
        // mutation-end
    },
};
