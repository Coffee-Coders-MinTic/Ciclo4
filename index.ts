import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import {typeDefs} from './graphql/types';

dotenv.config();

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT }, async ()=>{
    await conectarBD();
    await server.start();

    server.applyMiddleware({ app });

    console.log('Servidor listo');
});
