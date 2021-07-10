"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const { gql } = require("apollo-server-express");
exports.typeDefs = gql `
  scalar Date
  #

  # generated definitions

  input movieOptionsInput {
    actors: [String]
    duration: Int
    name: String
    views: Int
  }

  type movieOptionsType {
    actors: [String]
    duration: Int
    name: String
    views: Int
  }

  input addCrudOperationsOptionsInput {
    schemaName: String
    crudActions: [String]
    identifier: identifier
  }
  # added at: Thu Jul 01 2021 16:50:14 GMT+0300 (Israel Daylight Time)

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
  input identifier {
    name: String
    type: String
  }
  type Query {
    getResolvers: String
    getTypeDefs: String
    getActions: [String]
    getAllResolverNames: [String]
    getAllowedTypes: [String]
    getAllDBSchemaNames: [String]
    getAllSchemaProps(schemaName: String): [String]
    readOneMovie(name: String): movieOptionsType
    readAllMovies: [movieOptionsType]
    readManyMovies(name: String): [movieOptionsType]
    # query-end
  }
  type Mutation {
    createResolver(options: ResolverOptions): String
    createCustomType(options: createCustomTypeOptions): String
    createSchema(options: createSchemaOptions): String
    addUserAuth(options: addUserAuthOptions): String
    restartServer(timeout: Int): String
    addCrudOperations(options: addCrudOperationsOptionsInput): String
    createOneMovie(options: movieOptionsInput): String
    deleteOneMovie(name: String): String
    updateManyMovies(options: movieOptionsInput): String
    updateOneMovie(options: movieOptionsInput): String
    # mutation-end
  }
`;
// # readOneMessage(:): MessageOptionsType
