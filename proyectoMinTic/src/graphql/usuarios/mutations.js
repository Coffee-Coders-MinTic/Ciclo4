import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!,
    $nombreCompleto: String!,
    $identificacion: String!,
    $correo: String!,
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id,
      nombreCompleto: $nombreCompleto, 
      identificacion: $identificacion,
      correo: $correo, 
      estado: $estado
    ) {
      _id
      nombreCompleto
      identificacion
      correo
      estado
    }
  }
`;


export { EDITAR_USUARIO };
