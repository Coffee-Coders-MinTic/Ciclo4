import mongoose from "mongoose";
//import { Enum_Tipo, Enum_EstadoUsuario } from "./enums";

const { Schema, model } = mongoose;

// interface User{
//     correo: string;
//     identificacion: string;
//     nombreCompleto: string;
//     tipo: Enum_Tipo;
//     estado: Enum_EstadoUsuario;
// }


const usuarioSchema = new Schema({
    correo:{type:String, required:true, unique:true},
    identificacion:{type:String, required:true, unique:true},
    nombreCompleto:{type:String, required:true},
    tipo:{type:String, required:true, enum:['ESTUDIANTE','LIDER','ADMINISTRADOR']},
    estado:{type:String, enum:['PENDIENTE','AUTORIZADO','NO_AUTORIZADO'], default:'PENDIENTE'}
})

const UsuarioModel = model('Usuario', usuarioSchema, 'usuarios'); //Usuario es el nombre del modelo 

export {UsuarioModel};