const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  scalar Date
  
  # generated definitions

  # generated definitions end

  type Query {
    test: String

    # query-end
  }
  type Mutation {
    test: String

    # mutation-end

  }
`;
