import { ProyectoModel } from './proyecto.js';

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProyectoModel.find();
      return proyectos;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProyectoModel.create({
        nombreProyecto: args.nombreProyecto,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFinal: args.fechaFinal,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objGenerales: args.objGenerales,
        objEspecificos: arg.objEspecificos,
      });
      return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProyectoModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );
      return proyectoEditado;
    },   
    },
};

export { resolversProyecto };