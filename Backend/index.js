import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import conectarBD from "./db/db.js";
import { types } from "./graphql/types.js";
import { resolvers } from "./graphql/resolvers.js";
import { validateToken } from "./utils/tokenUtils.js";

dotenv.config(); //para que nos deje usar dotenv (variables de entorno) en toda la aplicación

const getUserData = (token) => {
  const verificacion = validateToken(token.split(" ")[1]);
  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: types,
  resolvers: resolvers,
  context: ({ req, res }) => {
    const token = req.headers?.authorization ?? null;
    if (token) {
      const userData = getUserData(token);
      if (userData) {
        return { userData };
      }
    }
    return null;
  },
});

const app = express();
app.use(express.json());
app.use(cors());

console.log("CI Init");

app.get("/health-check", (req, resp) => {
  resp.json("ok");
});

app.listen({ port: process.env.PORT || 4000 }, async () => {
  //sirve para poner a correr el servidor
  await conectarBD();
  await server.start();

  server.applyMiddleware({ app });
  console.log("Servidor listo");
});

export { app };
