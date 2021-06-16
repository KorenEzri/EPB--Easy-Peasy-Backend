const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  type Query {
    test: String
  }
  type Mutation {
  }
`;

module.exports = { typeDefs };
