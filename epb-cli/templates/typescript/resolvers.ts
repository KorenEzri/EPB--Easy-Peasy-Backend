import { GraphQLScalarType } from "graphql";
// option types
import {stubA, stub} from "./types"
const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value: string | number | Date) {
    return new Date(value);
  },
  serialize(value: { toISOString: () => any }) {
    return value.toISOString();
  },
});
export const resolvers = {
  Date: dateScalar,
  Query: {
    // Action: test
    test: async () => {
      console.log("TEST PASSED!"); 
      return "OK!";
    },
    // query-end
  },
  Mutation: {
    // Action: mutation test
    test: async () => {
      console.log("TEST PASSED!"); 
      return 'OK';
    },
    // mutation-end
  }
};
