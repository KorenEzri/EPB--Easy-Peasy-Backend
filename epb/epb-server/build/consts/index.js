"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableCRUDActions = exports.validTypes = exports.allCustomTypesWithArrayTypes = exports.validResolverTypes = exports.allCustomTypes = void 0;
const typeDefs_1 = require("../typeDefs");
exports.allCustomTypes = typeDefs_1.typeDefs.definitions.map((definition) => definition.name.value);
exports.validResolverTypes = ["Query", "Mutation"];
const customTypesAsGQLArrays = exports.allCustomTypes.map((type) => {
    return `[${type}]`;
});
const customTypesAsTSArrays = exports.allCustomTypes.map((type) => {
    return `${type}[]`;
});
exports.allCustomTypesWithArrayTypes = customTypesAsTSArrays
    .concat(customTypesAsGQLArrays)
    .concat(exports.allCustomTypes);
exports.validTypes = [
    "string",
    "string[]",
    "String",
    "String[]",
    "number",
    "number[]",
    "Number",
    "Number[]",
    "boolean",
    "boolean[]",
    "Boolean",
    "Boolean[]",
    "date",
    "date[]",
    "Date",
    "Date[]",
    "[string]",
    "[String]",
    "[number]",
    "[Number]",
    "[boolean]",
    "[Boolean]",
    "[date]",
    "[Date]",
    "int",
    "int[]",
    "Int",
    "Int[]",
    "[int]",
    "[Int]",
].concat(exports.allCustomTypesWithArrayTypes);
exports.availableCRUDActions = ` {"availableCRUDActions": [
    "Create One",
    "Create Many",
    "Read One",
   "Read Many",
    "Read All",
    "Update One",
    "Update Many",
    "Delete One",
    "Delete Many"
]}`;
