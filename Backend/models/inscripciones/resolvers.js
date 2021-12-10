import { InscripcionModel } from "./inscripciones.js";

const resolverInscripciones = {
  Query: {
    inscripciones: async (parent, args) => {
      const inscripciones = await InscripcionModel.find().populate(
        "proyecto estudiante"
      );
      return inscripciones;
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

      //TODO
      //Validar por rol, que solo sea estudiante

      if (!inscripcionesActuales.length) {
        const inscripcionCreada = await InscripcionModel.create({
          estado: args.estado,
          proyecto: args.proyecto,
          estudiante: args.estudiante,
        }).populate("proyecto estudiante");

        return inscripcionCreada;
      } else {
        return console.log("El usuario ya se encuentra inscrito");
      }
    },
    actualizarInscripcion: async (parent, args) => {
      const inscripcionActualizada = await InscripcionModel.findByIdAndUpdate(
        args._id,
        { estado: args.estado },
        { new: true }
      );
      return inscripcionActualizada.estado;
    },
  },
};

export { resolverInscripciones };
