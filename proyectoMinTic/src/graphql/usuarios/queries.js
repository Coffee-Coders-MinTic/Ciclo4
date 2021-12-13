import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Query($filtro: FiltroUsuarios) {
    Usuarios(filtro: $filtro) {
      _id
      nombreCompleto
      correo
      estado
      identificacion
      tipo
    }
  }
`;

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      _id
      nombreCompleto
      correo
      estado
      identificacion
      tipo
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };
