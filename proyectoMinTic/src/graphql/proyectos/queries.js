import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombreProyecto
      estado
      fase
      presupuesto
      fechaInicio
      fechaFinal
      objGenerales
      objEspecificos
      lider {
        _id
        nombreCompleto
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

export { PROYECTOS };