import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Usuarios {
    Usuarios {
      _id
      nombreCompleto
      identificacion
      correo
      estado
      tipo
    }
  }
`;


const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombreCompleto
      identificacion
      correo
      estado
      tipo
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
