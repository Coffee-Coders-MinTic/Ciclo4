import { ProyectoModel } from "./proyecto.js";
import { UsuarioModel } from "../usuarios/usuario.js";

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      return await ProyectoModel.find().populate("lider inscripciones avances");
    },
    Proyecto: async (parent, args) => {
      return await ProyectoModel.findOne({ _id: args._id }).populate("lider");
    },
  },
  Mutation: {
    crearProyecto: async (parent, args, context) => {
      const proyectoCreado = await ProyectoModel.create(args);
      return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProyectoModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      ).populate("lider");
      return proyectoEditado;
    },
  },
};

export { resolversProyecto };
