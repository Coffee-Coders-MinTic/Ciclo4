import { ModeloAvance } from './avance';

const resolversAvance = {
    Query:{
        Avances: async (parent, args) => {
            const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
            return avances;

        },
    },
    Mutation: {
        crearAvance: async (parent, args)=>{
            const avanceCreado = ModeloAvance.create({
                fecha: args.fecha,
                descripcion: args.descripcion,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
            });
            return avanceCreado;
        },
        filtrarAvance: async(parent, args)=>{
            const avanceFiltrado = await ModeloAvance.find({ proyecto: args.idProyecto})
                .populate("proyecto")
                .populate(!"creadoPor");
            return avanceFiltrado;
        },
    },
};

export { resolversAvance }; 