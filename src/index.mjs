import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pino from 'pino';

import { typeDefs } from "./typeDefs.js";
import { getUserData } from "./resolvers.js";

dotenv.config();

const logger = pino({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' });

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        userData: (_, args) => {
            try {
                return getUserData(args.id)
            } catch(err) {
                logger.error(err, 'Failed to fetch data');
            }
        },
    },
};

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
logger.info(`🚀 Server ready at http://localhost:${process.env.PORT}`);