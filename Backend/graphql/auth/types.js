import { gql } from 'apollo-server-express';

const tiposAutenticacion = gql`
  type Token {
    token: String
    error: String
  }

  type Mutation {
    registro(
      nombreCompleto: String!
      identificacion: String!
      correo: String!
      tipo: Enum_Tipo!
      estado: Enum_EstadoUsuario
      password: String!
    ): Token!

    login(correo: String!, password: String!): Token

    refreshToken: Token
  }
`;

export { tiposAutenticacion };
