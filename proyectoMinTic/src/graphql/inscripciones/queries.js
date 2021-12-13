import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
      _id
      estado
      estudiante {
        _id
        nombreCompleto
        correo
      }
      proyecto {
        _id
        nombreProyecto
        lider {
          _id
        }
      }
    }
  }
`;

export { GET_INSCRIPCIONES };
