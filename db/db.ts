import { connect } from 'mongoose';

const conectarBD = async () => {
    return await connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Conexión exitosa');
        })
        .catch((e) => {
            console.error('Error conectando a la bd', e);
        });
};

export default conectarBD;

