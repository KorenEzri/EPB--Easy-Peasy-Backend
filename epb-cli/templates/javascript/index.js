require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./connections");
const { Logger } = require("./logger/logger");

const PORT = process.env.PORT || 8081;
connectToDb();
const startServer = async () => {
  const app = express();
  app.use(
    cors({
      allowedHeaders: ["Content-Type"],
      origin: "*",
      preflightContinue: true,
    })
  );
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  const server = new ApolloServer({
    context: ({ req, res }) => ({ req, res }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () =>
    Logger.info(
      `Server is now running at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};
startServer();
