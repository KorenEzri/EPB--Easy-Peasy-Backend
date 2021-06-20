"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const { gql } = require("apollo-server-express");
exports.typeDefs = gql `
scalar Date
# generated definitions

 input GetCarsOptions {
  Shala: Number,
  lala: String,
  TESTAS: String
}
# added at: Sun Jun 20 2021 13:36:49 GMT+0300 (Israel Daylight Time)

# generated definitions end
input ResolverOptions {
name: String
comment: String
resolver: String
returnType: String
type: String
vars: [String]
}
type Query {
getResolvers: String
getTypeDefs: String
getActions: [String]

# query-end
}
type Mutation {
createResolver(options: ResolverOptions): String

GetCars(options: GetCarsOptions): [Number]
# mutation-end
}
`;
