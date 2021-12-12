import mongoose from "mongoose";


const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
  correo: {type: String, required: true, unique: true,
    validate: {validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      }, 
      message: 'El formato del correo electrónico está malo.',
    },
  },
    password: {type:String, required: true},
    identificacion:{type:String, required:true, unique:true},
    nombreCompleto:{type:String, required:true},
    tipo:{type:String, required:true, enum:['ESTUDIANTE','LIDER','ADMINISTRADOR']},
    estado:{type:String, enum:['PENDIENTE','AUTORIZADO','NO_AUTORIZADO'], default:'PENDIENTE'}
})

usuarioSchema.virtual('proyectosLiderados', {
    ref: 'Proyecto',
    localField: '_id',
    foreignField: 'lider',
  });
  
  usuarioSchema.virtual('avances', {
    ref: 'Avance',
    localField: '_id',
    foreignField: 'creador',
  });
  
  usuarioSchema.virtual('inscripciones', {
    ref: 'Inscripcion',
    localField: '_id',
    foreignField: 'estudiante',
  });


const UsuarioModel = model('Usuario', usuarioSchema, 'usuarios'); //Usuario es el nombre del modelo 

export {UsuarioModel};