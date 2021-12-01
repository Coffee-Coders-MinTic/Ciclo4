import { gql } from 'apollo-server-express';

const typesAvance = gql`
  type Avance {
    _id: ID!
    fechaAvance: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creador: Usuario!
  }
  type Query {
    Avances: [Avance]
    filtrarAvance(_id: String!): [Avance]
  }
  type Mutation {
    crearAvance(fechaAvance: Date!, descripcion: String!, proyecto: String!, creador: String!): Avance
  }
`;

export { typesAvance };