"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const { gql } = require("apollo-server-express");
exports.typeDefs = gql `
  scalar Date
  type Query {
    getResolvers: String
    getTypeDefs: String
    getActions: [String]
  }
`;
