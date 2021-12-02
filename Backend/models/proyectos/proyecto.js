import mongoose from "mongoose";
//import { Enum_EstadoProyecto, Enum_Fase } from "./enums";
import { UsuarioModel } from "../usuarios/usuario.js";
const { Schema, model } = mongoose;

// interface Project{
//     nombreProyecto: string;
//     objGenerales: [string];
//     objEspecificos: [string];
//     presupuesto: number;
//     fechaInicio: Date;
//     fechaFinal: Date;
//     estado: Enum_EstadoProyecto;
//     fase: Enum_Fase;
//     lider:Schema.Types.ObjectId;
// }

const proyectoSchema = new Schema(
  {
    nombreProyecto: { type: String, required: true },
    objGenerales: [{ type: String, required: true }],
    objEspecificos: [{ type: String, required: true }],
    presupuesto: { type: Number, required: true },
    fechaInicio: { type: Date, required: true },
    fechaFinal: { type: Date },
    estado: { type: String, enum: ["ACTIVO", "INACTIVO"], default: "INACTIVO" },
    fase: {
      type: String,
      enum: ["INICIADO", "DESARROLLO", "TERMINADO", "NULO"],
      default: "NULO",
    },
    lider: { type: Schema.Types.ObjectId, ref: UsuarioModel },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

proyectoSchema.virtual("avances", {
  ref: "Avance",
  localField: "_id",
  foreignField: "proyecto",
});

proyectoSchema.virtual("inscripciones", {
  ref: "Inscripcion",
  localField: "_id",
  foreignField: "proyecto",
});

const ProyectoModel = model("Proyecto", proyectoSchema, "proyectos"); // sino pongo el último (nombre de colección - 'proyectos'), mongo toma el primer campo (nombre modelo - 'Project') y lo pone con lowercase y agrega una s, quedando como projects.

export { ProyectoModel };
