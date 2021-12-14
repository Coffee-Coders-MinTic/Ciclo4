import mongoose from "mongoose";
import { UsuarioModel } from "../usuarios/usuario.js";
import { ProyectoModel } from "../proyectos/proyecto.js";

const { Schema, model } = mongoose;

const avanceSchema = new Schema({
  fechaAvance: { type: Date, default: Date.now },
  descripcion: { type: String, required: true },
  observaciones: { type: String },
  proyecto: { type: Schema.Types.ObjectId, required: true, ref: ProyectoModel },
  creador: { type: Schema.Types.ObjectId, required: true, ref: UsuarioModel },
});

const AvanceModel = model("Avance", avanceSchema, "avances");

export { AvanceModel };
