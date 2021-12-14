import { gql } from "@apollo/client";

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
      avances {
        _id
        fechaAvance
        descripcion
        observaciones
        creador {
          _id
        }
      }
    }
  }
`;

const GET_PROYECTO = gql`
  query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
      _id
      nombreProyecto
      presupuesto
      fechaInicio
      fechaFinal
      estado
      lider {
        nombreCompleto
      }
      fase
      objGenerales
      objEspecificos
      avances {
        _id
        fechaAvance
        descripcion
        observaciones
        creador {
          _id
          nombreCompleto
        }
      }
      inscripciones {
        _id
        estado
        estudiante {
          nombreCompleto
        }
      }
    }
  }
`;

export { PROYECTOS, GET_PROYECTO };
