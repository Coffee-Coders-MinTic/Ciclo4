import axios from 'axios';


const getToken =()=>{
    return `Bearer ${localStorage.getItem('token')}`;
}

const obtenerUsuarioRegistrado = async ()=>{
const options = {
    method: 'GET',
    url: 'https://intense-castle-32619.herokuapp.com/usuarios/self',
    headers: {'Content-Type': 'application/json', Authorization: getToken()}
}
await axios.request(options).catch(function (error) {console.error(error)});
}

export default obtenerUsuarioRegistrado;
