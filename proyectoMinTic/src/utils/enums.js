const Enum_EstadoUsuario = {
    PENDIENTE: 'Pendiente',
    AUTORIZADO: 'Autorizado',
    NO_AUTORIZADO: 'No autorizado',
  };

const Enum_EstadoProyecto = {
    ACTIVO: 'Activo',
    INACTIVO: 'Inactivo',
  };
    
const Enum_Tipo = {
    ADMINISTRADOR: 'Administrador',
    ESTUDIANTE: 'Estudiante',
    LIDER: 'Líder',
  };  

const Enum_Fase = {
        INICIADO: 'Iniciado',
        DESARROLLO: 'Desarrollado',
        TERMINADO: 'Terminado',
        NULO: 'Nulo',
    };

const Enum_EstadoInscripcion = {
        ACEPTADA: 'Aceptada',
        RECHAZADA: 'Rechazada',
        PENDIENTE: 'Pendiente',
    };


    
export {Enum_EstadoUsuario,Enum_EstadoProyecto,Enum_Tipo,Enum_Fase,Enum_EstadoInscripcion};