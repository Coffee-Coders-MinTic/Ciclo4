import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation Registro(
    $nombreCompleto: String!
    $identificacion: String!
    $correo: String!
    $tipo: Enum_Tipo!
    $password: String!
  ) {
    registro(
      nombreCompleto: $nombreCompleto
      identificacion: $identificacion
      correo: $correo
      tipo: $tipo
      password: $password
    ) {
      token
      error
    }
  }
`;

const LOGIN = gql`
  mutation Login($correo: String!, $password: String!) {
    login(correo: $correo, password: $password) {
      token
      error
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN };
