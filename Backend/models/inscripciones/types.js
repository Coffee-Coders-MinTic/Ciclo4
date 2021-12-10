import { gql } from "apollo-server-express";

const typesInscripcion = gql`
  input camposInscripcion {
    estado: Enum_EstadoInscripcion!
    proyecto: String!
    estudiante: String!
  }

  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: Proyecto!
    estudiante: Usuario!
  }
  type Query {
    inscripciones: [Inscripcion]
    inscripcionesPendientes: [Inscripcion]
  }
  type Mutation {
    crearInscripcion(
      estado: Enum_EstadoInscripcion
      proyecto: String!
      estudiante: String!
    ): Inscripcion
    actualizarInscripcion(_id: ID!, estado: Enum_EstadoInscripcion!): String
  }
`;

export { typesInscripcion };
