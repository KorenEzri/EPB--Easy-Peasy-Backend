const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  scalar Date
  type Query {
    test: String
  }
`;
