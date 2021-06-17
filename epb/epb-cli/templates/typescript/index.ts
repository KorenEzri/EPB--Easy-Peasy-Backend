require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import express from "express";
import cors from "cors";
import { connectToDb } from "./connections";
import Logger from "./logger/logger";
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
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });
  const server = new ApolloServer({
    context: ({ req, res }) => ({ req, res }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    resolvers: resolvers,
    typeDefs: typeDefs,
  });
  server.applyMiddleware({ app });
  app.listen({ port: PORT }, () =>
    Logger.info(
      `Server is now running at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};
startServer();
