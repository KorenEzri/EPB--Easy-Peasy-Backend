"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const { gql } = require("apollo-server-express");
exports.typeDefs = gql `
  scalar Date
  #

  # generated definitions

  input addUserAuthOptions {
    publicUserInputs: [String]
    authUserInputs: [String]
    publicUserProperties: [String]
    authUserProperties: [String]
  }
  # added at: Fri Jun 25 2021 19:30:07 GMT+0300 (Israel Daylight Time)

  input createSchemaOptions {
    properties: [String]
    name: String
    comment: String
    typeDef: Boolean
    dbSchema: Boolean
    type: String
    uniqueIdentifiers: [String]
  }
  # added at: Tue Jun 22 2021 09:40:13 GMT+0300 (Israel Daylight Time)

  input createCustomTypeOptions {
    properties: [String]
    name: String
    comment: String
    dbSchema: Boolean
    typeDef: Boolean
    type: String
  }
  # added at: Sun Jun 20 2021 15:26:15 GMT+0300 (Israel Daylight Time)

  #

  # generated definitions end

  input ResolverOptions {
    name: String
    comment: String
    resolver: String
    returnType: String
    type: String
    properties: [String]
    description: String
  }
  type Query {
    getResolvers: String
    getTypeDefs: String
    getActions: [String]
    getAllResolverNames: [String]

    getMessages: [messageOptions]

    # query-end
  }
  type Mutation {
    createResolver(options: ResolverOptions): String
    createCustomType(options: createCustomTypeOptions): String
    createSchema(options: createSchemaOptions): String
    addUserAuth(options: addUserAuthOptions): String
    # mutation-end
  }
`;
