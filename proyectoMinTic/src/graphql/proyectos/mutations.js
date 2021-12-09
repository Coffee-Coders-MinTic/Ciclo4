import { gql } from '@apollo/client';

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
    $objGenerales: [String]
    $objEspecificos: [String]
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFinal: Date!
    $estado: Enum_EstadoProyecto
    $fase: Enum_Fase
    $lider: String!    
  ) {
    crearProyecto(
      nombreProyecto: $nombreProyecto
      objGenerales: $objGenerales
      objespecificos: $objEspecificos
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFinal: $fechaFinal
    estado: $estado
        fase: $fase
      lider: $lider
      
    ) {
      _id: ID!
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO };
