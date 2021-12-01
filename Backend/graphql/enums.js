import { gql } from "apollo-server-express"

// Por convención los enums en graphql van en mayuscula
const Enums = gql`
    
    enum Enum_Tipo{ 
        ESTUDIANTE 
        LIDER 
        ADMINISTRADOR 
    }
    
    enum Enum_EstadoUsuario{
        PENDIENTE
        AUTORIZADO 
        NO_AUTORIZADO 
    }

   
    enum Enum_EstadoProyecto{
        ACTIVO
        INACTIVO
    }

    enum Enum_Fase{
        INICIADO
        DESARROLLO
        TERMINADO
        NULO
    }


    enum Enum_EstadoInscripcion{
        ACEPTADA
        RECHAZADA
        PENDIENTE
    }
`;


export {Enums};