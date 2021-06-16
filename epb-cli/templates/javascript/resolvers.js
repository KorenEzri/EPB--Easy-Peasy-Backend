const { GraphQLScalarType } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});
const resolvers = {
  Date: dateScalar,
  Query: {},
  Mutation: {},
};

module.exports = { resolvers };
