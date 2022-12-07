import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import pino from 'pino';
import {DynamoDBClient, QueryCommand} from "@aws-sdk/client-dynamodb";

import {typeDefs} from "./typeDefs.js";

dotenv.config();

const logger = pino({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' });

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        userData: async (_, args) => {
            try {
                const params = {
                    ExpressionAttributeValues: {
                        ":userId": {
                            S: args.id,
                        },
                    },
                    KeyConditionExpression: "user_id = :userId",
                    TableName: "fandom_in_year_hackathon",
                    ProjectionExpression: "user_id, stats",
                };

                const data = await client.send(new QueryCommand(params));
                const result = data?.Items[0]?.stats.S;
                const strippedResult = result
                    .replace(/\\n/g, "\\n")
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, "\\&")
                    .replace(/\\r/g, "\\r")
                    .replace(/\\t/g, "\\t")
                    .replace(/\\b/g, "\\b")
                    .replace(/\\f/g, "\\f")
                    .replace(/[\u0000-\u0019]+/g,"");

                console.log(strippedResult);
                console.log('\n\n\n');

                return JSON.parse(strippedResult);
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