import {gql} from 'apollo-server-express';
import {Enums} from './enums.js';
import {typesUsuario} from '../models/usuarios/types.js';
import {typesProyecto} from '../models/proyectos/types.js';
import { typesAvance } from '../models/avances/types.js';
import { typesInscripcion } from '../models/inscripciones/types.js';
import { typesAutenticacion } from './auth/types.js';


// Toca ponerlo de esta manera porque graphql no lo tiene como tipo de dato
const typesGlobales = gql`
    scalar Date 
`;

export const types = [
    typesGlobales,
    Enums,
    typesUsuario,
    typesProyecto,
    typesAvance,
    typesInscripcion,
    typesAutenticacion,
];