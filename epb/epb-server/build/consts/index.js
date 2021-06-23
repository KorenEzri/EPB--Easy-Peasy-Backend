"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validTypes = exports.validResolverTypes = exports.allCustomTypes = void 0;
const typeDefs_1 = require("../typeDefs");
exports.allCustomTypes = typeDefs_1.typeDefs.definitions.map((definition) => definition.name.value);
exports.validResolverTypes = ["Query", "Mutation"];
exports.validTypes = [
    "string",
    "String",
    "number",
    "Number",
    "boolean",
    "Boolean",
    "date",
    "Date",
    "[string]",
    "[String]",
    "[number]",
    "[Number]",
    "[boolean]",
    "[Boolean]",
    "[date]",
    "[Date]",
    "int",
    "Int",
    "[int]",
    "[Int]",
].concat(exports.allCustomTypes);
