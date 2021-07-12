"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { connectToDb } from "./connections";
const logger_1 = __importDefault(require("./logger/logger"));
const PORT = process.env.PORT || 8001;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default({
        allowedHeaders: ["Content-Type"],
        origin: "*",
        preflightContinue: true,
    }));
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        next();
    });
    const server = new apollo_server_express_1.ApolloServer({
        context: ({ req, res }) => ({ req, res }),
        playground: {
            settings: {
                "request.credentials": "include",
            },
        },
        resolvers: resolvers_1.resolvers,
        typeDefs: typeDefs_1.typeDefs,
    });
    server.applyMiddleware({ app });
    app.listen({ port: PORT }, () => logger_1.default.info(`EPB-server @ http://localhost:${PORT}${server.graphqlPath}`));
    logger_1.default.http("Client @ http://localhost:5000");
    // await connectToDb();
});
startServer();
