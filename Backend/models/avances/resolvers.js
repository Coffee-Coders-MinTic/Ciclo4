import {AvanceModel} from './avances.js';

const resolversAvance = {
    Query: {
      Avances: async (parent, args) => {
        const avances = await AvanceModel.find().populate('proyecto').populate('creador');
        return avances;
      },
      filtrarAvance: async (parents, args) => {
        const avanceFiltrado = await AvanceModel.find({ proyecto: args._id })
          .populate('proyecto')
          .populate('creador');
        return avanceFiltrado;
      },
    },
    Mutation: {
      crearAvance: async (parents, args) => {
        const avanceCreado = AvanceModel.create({
          fechaAvance: args.fechaAvance,
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creador: args.creador,
        });
        return avanceCreado;
      },
    },
  };
  
  export { resolversAvance };