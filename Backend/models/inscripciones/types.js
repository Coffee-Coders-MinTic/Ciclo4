import { gql } from "apollo-server-express";

const typesInscripcion = gql`
  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto(lider: String): Proyecto
    estudiante: Usuario!
  }
  type Query {
    Inscripciones: [Inscripcion]
    inscripcionesPendientes: [Inscripcion]
  }
  type Mutation {
    crearInscripcion(proyecto: String!, estudiante: String!): Inscripcion
    actualizarInscripcion(_id: ID!, estado: Enum_EstadoInscripcion!): Inscripcion
  }
`;

export { typesInscripcion };
