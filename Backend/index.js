import express from 'express';
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import {types} from './graphql/types.js';
import {resolvers} from './graphql/resolvers.js';

dotenv.config(); //para que nos deje usar dotenv (variables de entorno) en toda la aplicación

 const server = new ApolloServer({
     typeDefs:types,
     resolvers:resolvers,
 });

const app = express();
app.use(express.json());
app.use(cors());

app.listen({port:process.env.PORT || 4000}, async()=>{  //sirve para poner a correr el servidor
    await conectarBD();
    await server.start();

    server.applyMiddleware({app});
    console.log('Servidor listo')
})