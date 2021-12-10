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
      fase
      objGenerales
    objEspecificos
      lider {
        _id
        correo
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