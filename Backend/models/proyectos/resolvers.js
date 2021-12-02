import { ProyectoModel } from "./proyecto.js";
import { UsuarioModel } from "../usuarios/usuario.js";

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      return await ProyectoModel.find().populate("lider");
    },
    Proyecto: async (parent, args) => {
      return await ProyectoModel.findOne({ _id: args._id }).populate("lider");
    },
  },
  Mutation: {
    crearProyecto: (parent, args) => {
      const {
        nombreProyecto,
        presupuesto,
        fechaInicio,
        fechaFinal,
        estado,
        fase,
        lider,
        objGenerales,
        objEspecificos,
      } = args.proyecto;

      return ProyectoModel.create(args.proyecto)
        .then((u) => "Proyecto creado")
        .catch((err) => console.log(err));
    },
    editarProyecto: async (parent, args) => {
      const actualUser = await UsuarioModel.findOne({ _id: args.campos.lider });

      if (actualUser.tipo === "LIDER") {
        const proyectoEditado = await ProyectoModel.findByIdAndUpdate(
          args._id,
          { ...args.campos },
          { new: true }
        ).populate("lider");
        return proyectoEditado;
      }
    },
  },
};

export { resolversProyecto };
