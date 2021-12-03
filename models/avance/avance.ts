import mongoose from 'mongoose';
import { ProjectModel } from '../proyecto/proyecto';
import { UseModel } from '../usuario/usuario';

const { Schema, model } = mongoose;

interface Avance {
    fecha: Date;
    descripcion: string;
    observaciones: [string];
    proyecto: Schema.Types.ObjectId;
    creadoPor: Schema.Types.ObjectId;
}

const avanceSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    observaciones: [
        {
          type: String,
        },
    ],
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
    },
    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
});


const ModeloAvance = model('Avance', avanceSchema);

export { ModeloAvance };