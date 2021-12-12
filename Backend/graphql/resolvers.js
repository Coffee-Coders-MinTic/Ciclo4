import { resolversUsuario } from "../models/usuarios/resolvers.js";
import { resolversProyecto } from "../models/proyectos/resolvers.js";
import { resolverInscripciones } from "../models/inscripciones/resolvers.js";
import { resolversAvance } from "../models/avances/resolvers.js";
import { resolversAutenticacion } from "./auth/resolvers.js";

export const resolvers = [
  resolversUsuario,
  resolversProyecto,
  resolverInscripciones,
  resolversAvance,
  resolversAutenticacion,
];
