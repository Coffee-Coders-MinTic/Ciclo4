import mongoose from "mongoose";
import {UsuarioModel} from "../usuarios/usuario.js";
import {ProyectoModel} from "../proyectos/proyecto.js";
//import { Enum_EstadoInscripcion } from "../enums";
const { Schema, model } = mongoose;


const inscripcionSchema = new Schema({
    estado:{type:String, enum:['ACEPTADO','RECHAZADO','PENDIENTE'], required:true, default:'PENDIENTE'},
    fechaIngreso:{type:Date, required:false},
    fechaEgreso:{type:Date, required:false},
    proyecto:{type:Schema.Types.ObjectId, ref:ProyectoModel, required:true},
    estudiante:{type:Schema.Types.ObjectId, ref:UsuarioModel, required:true}
})

const InscripcionModel = model('Inscripcion', inscripcionSchema, 'inscripciones');

export {InscripcionModel};