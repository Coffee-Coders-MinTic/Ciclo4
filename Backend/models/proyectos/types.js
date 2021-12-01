import { gql } from 'apollo-server-express';

const typesProyecto = gql`
  input camposProyecto {
    nombreProyecto: String
    presupuesto: Float
    fechaInicio: Date
    fechaFinal: Date
    estado: Enum_EstadoProyecto
    fase: Enum_Fase
    lider: String
    objGenerales:[String]
    objEspecificos: [String]

  }
  type Proyecto {
    _id: ID!
    nombreProyecto: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFinal: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_Fase!
    lider: Usuario!
    objGenerales:[String]
    objEspecificos: [String]
    avances: [Avance]
    inscripciones: [Inscripcion]

  }
  type Query {
    Proyectos: [Proyecto]
  }
  type Mutation {
    crearProyecto(
      nombreProyecto: String!
      presupuesto: Float!
      fechaInicio: Date!
      fechaFinal: Date!
      estado: Enum_EstadoProyecto!
      fase: Enum_Fase!
      lider: String!

    ): Proyecto
    editarProyecto(_id: String!, campos: camposProyecto!): Proyecto
  }
`;

export { typesProyecto };