import { gql } from 'apollo-server-express';

const typesUsuario = gql`
  type Usuario {
    _id: ID!
    correo: String!
    nombreCompleto: String!
    identificacion: String!
    tipo: Enum_Tipo!
    estado: Enum_EstadoUsuario
  }
  type Query {
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
  }
  type Mutation {
    crearUsuario(
      correo: String!
      nombreCompleto: String!
      identificacion: String!
      tipo: Enum_Tipo!
      estado: Enum_EstadoUsuario
    ): Usuario
    editarUsuario(
      _id: String!
      correo: String!
      nombreCompleto: String!
      identificacion: String!
      estado: Enum_EstadoUsuario!
    ): Usuario
    eliminarUsuario(_id: String, correo: String): Usuario
  }
`;

export { typesUsuario };