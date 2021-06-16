import { GraphQLScalarType } from "graphql";

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
    test: async () => {
      console.log("TEST PASSED!");
      return "OK!";
    },
  },
  Mutation: {},
};
