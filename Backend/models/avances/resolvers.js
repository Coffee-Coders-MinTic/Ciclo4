import { AvanceModel } from "./avances.js";
import { UsuarioModel } from "../usuarios/usuario.js";
import { ProyectoModel } from "../proyectos/proyecto.js";

const resolversAvance = {
  Avance: {
    proyecto: async (parent, args, context) => {
      return await ProyectoModel.findOne({ _id: parent.proyecto });
    },
    creador: async (parent, args, context) => {
      return await UsuarioModel.findOne({ _id: parent.creador });
    },
  },
  Query: {
    Avances: async (parent, args) => {
      const avances = await AvanceModel.find().populate("proyecto creador");
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await AvanceModel.find({
        proyecto: args._id,
      }).populate("proyecto creador");
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
    editarAvance: async (parent, args) => {
      const avanceEditado = await AvanceModel.findByIdAndUpdate(
        args._id,
        {
          observaciones: args.observaciones,
          descripcion: args.descripcion,
        },
        { new: true }
      );

      return avanceEditado;
    },
  },
};

export { resolversAvance };
