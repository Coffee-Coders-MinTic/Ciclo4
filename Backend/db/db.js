import mongoose from 'mongoose';
// const mongoose = require('mongoose');

// import dotenv from 'dotenv'; //para variables de entorno
// dotenv.config({ path: './.env' });

const conectarBD = async()=>{
    return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log('Conexión a la BD exitosa')
    })
    .catch((e)=>{
        console.error('Error al conectar con la BD',e)
    })
};

export default conectarBD;