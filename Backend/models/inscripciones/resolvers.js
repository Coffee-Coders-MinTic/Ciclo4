import { InscripcionModel } from "./inscripciones.js";
import { UsuarioModel } from "../usuarios/usuario.js";
import { ProyectoModel } from "../proyectos/proyecto.js";

const resolverInscripciones = {
  Inscripcion: {
    proyecto: async (parent, args, context) => {
      return await ProyectoModel.findOne({ _id: parent.proyecto });
    },
    estudiante: async (parent, args, context) => {
      return await UsuarioModel.findOne({ _id: parent.estudiante });
    },
  },

  Query: {
    Inscripciones: async (parent, args, context) => {
      let filtro = {};
      if (context.userData) {
        if (context.userData.tipo === "LIDER") {
          const projects = await ProyectoModel.find({
            lider: context.userData._id,
          });
          const projectList = projects.map((p) => p._id.toString());
          filtro = {
            proyecto: {
              $in: projectList,
            },
          };
        }
      }
      const inscripciones = await InscripcionModel.find({ ...filtro });
      return inscripciones;

      // const inscripciones = await InscripcionModel.find().populate(
      //   "proyecto estudiante"
      // );
      // return inscripciones;
    },
    inscripcionesPendientes: async (parent, args) => {
      const inscripcionesPend = await InscripcionModel.find({
        estado: "PENDIENTE",
      }).populate("proyecto estudiante");
      return inscripcionesPend;
    },
  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionesActuales = await InscripcionModel.find({
        estudiante: args.estudiante,
        proyecto: args.proyecto,
      }).catch((err) => console.log(err));

      if (!inscripcionesActuales.length) {
        const inscripcionCreada = await InscripcionModel.create({
          proyecto: args.proyecto,
          estudiante: args.estudiante,
        });

        return inscripcionCreada;
      } else {
        return console.log("El usuario ya se encuentra inscrito");
      }
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscripcionModel.findByIdAndUpdate(
        args.id,
        {
          estado: "ACEPTADA",
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
    actualizarInscripcion: async (parent, args) => {
      const inscripcionActualizada = await InscripcionModel.findByIdAndUpdate(
        args._id,
        { estado: args.estado },
        { new: true }
      );
      return inscripcionActualizada;
    },
  },
};

export { resolverInscripciones };
