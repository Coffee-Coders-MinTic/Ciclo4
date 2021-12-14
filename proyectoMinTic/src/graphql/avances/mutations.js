import { gql } from "@apollo/client";

const EDITAR_AVANCE = gql`
  mutation EditarAvance(
    $_id: String!
    $descripcion: String
    $observaciones: String
  ) {
    editarAvance(
      _id: $_id
      descripcion: $descripcion
      observaciones: $observaciones
    ) {
      _id
      descripcion
      observaciones
    }
  }
`;

const CREAR_AVANCE = gql`
  mutation CrearAvance(
    $fechaAvance: Date
    $descripcion: String!
    $proyecto: String!
    $creador: String!
  ) {
    crearAvance(
      fechaAvance: $fechaAvance
      descripcion: $descripcion
      proyecto: $proyecto
      creador: $creador
    ) {
      _id
      fechaAvance
      descripcion
      observaciones
    }
  }
`;

export { EDITAR_AVANCE, CREAR_AVANCE };
