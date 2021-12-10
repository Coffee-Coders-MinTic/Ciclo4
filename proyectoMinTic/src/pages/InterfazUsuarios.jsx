import 'react-toastify/dist/ReactToastify.css';
import 'styles/EstiloIntUsuario.css';
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import IconoUsuarios from 'media/IconoAdminUsuarios.jpg';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import axios from 'axios';



const Usuarios=()=>{
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
    const [consulta, setConsulta] = useState(true);

    useEffect(() => {
        const obtenerUsuarios = async ()=>{
            const options = {
                method: 'GET',
                url: 'http://localhost:5000/usuarios/',
                headers: {'Content-Type': 'application/json'}
              };
              
              axios.request(options).then(function (response) {
                setUsuarios(response.data);
              }).catch(function (error) {
                console.error(error);
              });
        };
        if (consulta){
            obtenerUsuarios();
            setConsulta(false);
        }
      }, [consulta]);

    useEffect(()=>{
        if (mostrarTabla){
            setConsulta(true);
        }
    },[mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla) {
          setTextoBoton('Crear Nuevo Usuario');
        } else {
          setTextoBoton('Listar Usuarios');
        }
      }, [mostrarTabla]);

    return(
        <div>
            <h2 className='font-bold text-4xl text-center text-gray-800 my-2'>Administración de Usuarios</h2>
            <div align='right'>
                <button onClick={() => {setMostrarTabla(!mostrarTabla);}}
                        className={`text-white font-bold bg-green-500 p-5 rounded-full m-6 w-28 self-end`}>
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (
            <TablaUsuarios listaUsuarios={usuarios} setConsulta={setConsulta} />
        ) : (
            <RegistroUsuarios
            setMostrarTabla={setMostrarTabla}
	    listaUsuarios={usuarios}
            setUsuarios={setUsuarios}
            />
        )}
        <ToastContainer position='bottom-center' autoClose={5000} />     
        </div>
    )

}


const RegistroUsuarios=({setMostrarTabla, listaUsuarios, setUsuarios})=>{

    const form = useRef(null);

    const submitForm = async(e) => {
        e.preventDefault();
        const regusuarios = new FormData(form.current);

        const nuevoUsuario = {};
            regusuarios.forEach((value, key) => {
            nuevoUsuario[key] = value;
            });

        const options = {
            method: 'POST',
            url: 'http://localhost:5000/usuarios/',
            headers: { 'Content-Type': 'application/json' },
            data: { documento: nuevoUsuario.documento, nombre: nuevoUsuario.nombre, correo: nuevoUsuario.correo, telefono: nuevoUsuario.telefono, estado: nuevoUsuario.estado, rol: nuevoUsuario.rol },
            };
              
        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Usuario agregado con éxito');
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error creando el usuario');
            });
        
        setMostrarTabla(true)    
        setUsuarios([...listaUsuarios, nuevoUsuario]);
    }

    return(
            <div className='flex flex-col items-center justify-center'>   
             <img src={IconoUsuarios} alt='imagen' className='h-40 w-auto my-7 rounded-full' />   
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <h1 className='font-bold text-2xl text-blue-500 my-5 text-center'> Registro de Usuarios</h1>
                <div className='flex flex-row'>
                <label className='flex flex-col mx-5' htmlFor='documento'> 
                    Ingrese su Documento 
                    <input 
                        name='documento' 
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='1153763237' 
                        required/>
                </label>
                <label className='flex flex-col' htmlFor='nombre'> 
                    Ingrese su Nombre 
                    <input 
                        name='nombre' 
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        type='text' 
                        placeholder='Ana Giraldo Cardona' 
                        required/>
                </label>
                </div>
                <div className='flex flex-row'>
                <label className='flex flex-col mx-5' htmlFor='correo'> 
                    Ingrese su Correo
                    <input 
                        name='correo' 
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        type='email' 
                        placeholder='anagc21@gmail.com' 
                        required/>
                </label>
                <label className='flex flex-col' htmlFor='telefono'> 
                    Ingrese su Teléfono 
                    <input 
                        name='telefono' 
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='3127642342' />
                </label>
                </div>
                <div className='flex flex-row'>
                <label className='flex flex-col mx-5' htmlFor='estado'>
                    Ingrese su Estado
                    <select
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        name='estado'
                        defaultValue={0}>

                        <option disabled value={0}>Seleccione una opción</option>
                        <option>Pendiente</option>
                        <option>Autorizado</option>
                        <option>No Autorizado</option>
                    </select>
                </label>
                <label className='flex flex-col' htmlFor='rol'>
                    Ingrese su Rol
                    <select
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        name='rol'
                        defaultValue={0}>

                        <option disabled value={0}>Seleccione una opción</option>
                        <option>Administrador</option>
                        <option>Vendedor</option>
                    </select>
                </label>
                </div>
                
            <div className='my-4' align='center'>
              <button type='submit'className='bg-blue-400 text-white font-bold rounded-full p-2'>Guardar Datos</button>
            </div>
        </form>
        </div>  
        
    )
}

const TablaUsuarios=({listaUsuarios, setConsulta})=>{ 

    const [buscar, setBuscar] = useState('');
    const [datoFiltrado, setDatoFiltrado] = useState(listaUsuarios)

    useEffect(()=>{
        setDatoFiltrado(
            listaUsuarios.filter((elemento)=>{
                return JSON.stringify(elemento).toLowerCase().includes(buscar.toLowerCase());
            })
        )
    },[buscar, listaUsuarios]);


    return(
            <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='font-bold text-4xl text-blue-500 my-5 text-center'> Listado de Usuarios</h1>
                <input placeholder='Buscar'
                value={buscar}
                onChange={(e)=>setBuscar(e.target.value)}
                className='border-2 border-gray-700 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500'
                 />
                <table className='tabla border border-green-500 table-auto'>
                    <thead>
                    <tr>
                        <th className='border border-blue-600'>Documento</th>
                        <th className='border border-blue-600'>Nombre</th>
                        <th className='border border-blue-600'>Correo</th>
                        <th className='border border-blue-600'>Teléfono</th>
                        <th className='border border-blue-600'>Estado</th>
                        <th className='border border-blue-600'>Rol</th>
                        <th className='border border-blue-600'>Editar Campos</th>
                    </tr>
                    </thead>
                    <tbody>
                        {datoFiltrado.map((usuarios) => {
                        return (
                            <FilaUsuario key={nanoid()} usuarios={usuarios} setConsulta={setConsulta}/>
                        );
                    })}
                    </tbody>
                </table>
            </div>
    )
}

const FilaUsuario = ({usuarios, setConsulta})=>{

    const [editar, setEditar] = useState(false);
    const [infoEditarUsuario, setInfoEditarUsuario] = useState({
        documento:usuarios.documento,
        nombre:usuarios.nombre,
        correo:usuarios.correo,
        telefono:usuarios.telefono,
        estado:usuarios.estado,
        rol:usuarios.rol,

    })

    const actualizarUsuario = async ()=>{
        const options = {
            method: 'PATCH',
            url: `http://localhost:5000/usuarios/${usuarios._id}`,
            headers: {'Content-Type': 'application/json'},
            data: { ...infoEditarUsuario },
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Usuario modificado con éxito');
            setConsulta(true);
          }).catch(function (error) {
            toast.error('Error modificando los datos del usuario');
            console.error(error);
          });

    }

    return(
        <tr>
        {editar ? (
            <>
            <td>
                <input type='text' value={infoEditarUsuario.documento} onChange={(e)=>setInfoEditarUsuario({...infoEditarUsuario, documento:e.target.value})} />
            </td>
            <td>
                <input type='text' value={infoEditarUsuario.nombre} onChange={(e)=>setInfoEditarUsuario({...infoEditarUsuario, nombre:e.target.value})}/>
            </td>
            <td>
                <input type='text' value={infoEditarUsuario.correo} onChange={(e)=>setInfoEditarUsuario({...infoEditarUsuario, correo:e.target.value})}/>
            </td>
            <td>
                <input type='text' value={infoEditarUsuario.telefono} onChange={(e)=>setInfoEditarUsuario({...infoEditarUsuario, telefono:e.target.value})}/>
            </td>
            <td>
            <select value={infoEditarUsuario.estado} onChange={(e)=>setInfoEditarUsuario({...infoEditarUsuario, estado:e.target.value})} >
                <option disabled value={0}>Seleccione una opción</option>
                <option>Pendiente</option>
                <option>Autorizado</option>
                <option>No Autorizado</option>
            </select>
            </td>
            <td>
            <select value={infoEditarUsuario.rol} onChange={(e)=>setInfoEditarUsuario({...infoEditarUsuario, rol:e.target.value})} >
                <option disabled value={0}>Seleccione una opción</option>
                <option>Vendedor</option>
                <option>Administrador</option>
            </select>
            </td>
            </>
        ):(
            <>
            <td>{usuarios.documento}</td>
            <td>{usuarios.nombre}</td>
            <td>{usuarios.correo}</td>
            <td>{usuarios.telefono}</td>
            <td>{usuarios.estado}</td>
            <td>{usuarios.rol}</td>
            </>
        )}
        <td>
            <div className='flex items-center justify-center'>
            {editar ? (
                <FontAwesomeIcon onClick={()=>actualizarUsuario() } icon={faUserCheck} className='text-blue-400 hover:text-blue-900' />
            ):(
                <FontAwesomeIcon onClick={()=>setEditar(!editar)} icon={faUserEdit} className='text-blue-400 hover:text-blue-900' />
            )} 
            </div>
        </td>
        </tr>       
    )
}

export default Usuarios;

