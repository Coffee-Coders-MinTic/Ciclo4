import mongoose from "mongoose";
import {UsuarioModel} from "../usuarios/usuario.js";
import {ProyectoModel} from "../proyectos/proyecto.js";

const { Schema, model } = mongoose;

// interface Advance{
//     fechaAvance: Date;
//     descripcion: string;
//     observaciones: [string];
//     proyecto: Schema.Types.ObjectId;
//     creador: Schema.Types.ObjectId    
//     }

const avanceSchema = new Schema({
    fechaAvance:{type:Date, required:true},
    descripcion:{type:String, required:true},
    observaciones:[{type:String}],
    proyecto:{type:Schema.Types.ObjectId, required:true, ref:ProyectoModel},
    creador:{type:Schema.Types.ObjectId, required:true, ref:UsuarioModel}
})

const AvanceModel = model('Avance', avanceSchema, 'avances');

export {AvanceModel};

