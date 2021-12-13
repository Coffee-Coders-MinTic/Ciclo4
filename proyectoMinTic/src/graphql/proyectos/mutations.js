import { gql } from "@apollo/client";

const EDITAR_PROYECTO = gql`
  mutation Mutation($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      _id
      estado
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombreProyecto: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objGenerales: [String]
    $objEspecificos: [String]
    
  ) {
    crearProyecto(
      nombreProyecto: $nombreProyecto
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objGenerales: $objGenerales
      objEspecificos: $objEspecificos
    ) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO };
