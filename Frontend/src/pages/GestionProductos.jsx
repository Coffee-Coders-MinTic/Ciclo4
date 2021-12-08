import 'react-toastify/dist/ReactToastify.css'; 
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconoProductos from 'media/logoProductos.jpeg';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { nanoid } from 'nanoid';

const GestionProductos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos]  = useState([]);
    const [textoBoton, setTextoBoton] = useState('Registra un producto');
    const [consulta, setConsulta] = useState(true);

    const getToken =()=>{
        return `Bearer ${localStorage.getItem('token')}`;
    }

    useEffect(() => {
        const obtenerProductos = async ()=>{
            const options = {
                method: 'GET',
                url: 'https://intense-castle-32619.herokuapp.com/productos/',
                headers: {'Content-Type': 'application/json', Authorization: getToken()}
            };

            await axios.request(options)
                .then(function (response) {
                setProductos(response.data);
                })
                .catch(function (error) {
                console.error(error);
            });
        };

        if (consulta){
            obtenerProductos();
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
          setTextoBoton('Registra un producto');
        } else {
          setTextoBoton('Ver inventario');
        }
    }, [mostrarTabla]);

    return (
        <body>
            <h1 className='font-bold text-4xl text-center text-gray-800 my-2'>Administración de Productos</h1>
            <div align='right'>
                <button 
                    onClick={()=>{setMostrarTabla(!mostrarTabla);
                    }}
                    className={'text-white font-bold bg-green-500 p-5 rounded-full m-6 w-28 self-end'}
                >
                    {textoBoton}
                </button>
            </div>

            {mostrarTabla ? (
            <TablaProductos listaProductos={productos} setConsulta={setConsulta} getToken={getToken} />
        ) : (
            <FormularioRegistroProductos 
            setMostrarTabla={setMostrarTabla}
            listaProductos={productos}
            setProductos={setProductos}
            getToken={getToken}
            />
        )}
        <ToastContainer position="bottom-center" autoClose={5000} />   
        </body>
    );
};

const FormularioRegistroProductos = ({setMostrarTabla, listaProductos, setProductos, getToken}) => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const registroDeProductos = new FormData(form.current);

        const nuevoProducto = {};
            registroDeProductos.forEach((value, key) => {
            nuevoProducto[key] = value;
            });

        const options = {
            method: 'POST',
            url: 'https://intense-castle-32619.herokuapp.com/productos/',
            headers: { 'Content-Type': 'application/json', Authorization: getToken() },
            data: { id: nuevoProducto.id, nombre: nuevoProducto.nombre, linea: nuevoProducto.linea, variante: nuevoProducto.variante, origen: nuevoProducto.origen, precio: nuevoProducto.precio},
            };
              
        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Producto agregado con éxito');
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error registrando el producto');
            });

        setMostrarTabla(true)
        setProductos([...listaProductos, nuevoProducto]);
    }


    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={IconoProductos} alt='imagen' className='h-40 w-auto my-7 rounded-full' /> 
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <h1 className='font-bold text-2xl text-blue-500 my-5 text-center'>Registro de productos</h1>
                <div className='flex flex-row'>
                <label className='flex flex-col mx-5' htmlFor='id'>
                    ID del producto
                    <input 
                        name='id'
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50' 
                        type='number' 
                        placeholder='009'
                        required
                    />
                </label>
                <label className='flex flex-col' htmlFor='nombre'>
                    Nombre
                    <input 
                        name='nombre'
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        type='text' 
                        placeholder='Juan Valdez'
                        required
                    />
                </label>
                </div>
                <div className='flex flex-row'>
                <label className='flex flex-col mx-5' htmlFor='linea'>
                    Línea
                    <select
                        name='linea'
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        required
                        defaultValue={0}
                    >
                        <option disabled value={0}>Seleccione una línea</option>
                        <option>Premium</option>
                        <option>Hogar</option>
                        <option>Sensacion</option>
                    </select>
                </label>
                <label className='flex flex-col mx-5' htmlFor='variante'>
                    Variante
                    <select           
                        name='variante' 
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        required
                        defaultValue={0}
                    >
                        <option disabled value={0}>Seleccione una variante</option>
                        <option>Arabica</option>
                        <option>Robusta</option>
                        <option>Liberica</option>
                    </select>
                </label>
                </div>
                <div className='flex flex-row'>  
                <label className='flex flex-col mx-5' htmlFor='origen'>
                    Origen
                    <input 
                        name='origen'
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        type='text' 
                        placeholder='Putumayo'
                        required  
                    />
                </label>       
                <label className='flex flex-col' htmlFor='precio'>
                    Precio
                    <input 
                        name='precio'
                        className='bg-gray-50 border border-blue-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='30000'
                        required
                    />
                </label>
                </div>

            <div className='my-4' align='center'>
                <button 
                    type='submit' 
                    className='bg-blue-400 text-white font-bold rounded-full p-2'
                >
                    Registrar producto
                </button>
            </div>
            </form>
        </div>
    );
};


const TablaProductos = ({listaProductos, setConsulta, getToken}) => {

    const [buscar, setBuscar] = useState('');
    const [datoFiltrado, setDatoFiltrado] = useState(listaProductos)

    useEffect(() => {
        setDatoFiltrado(
            listaProductos.filter((elemento)=>{
                return JSON.stringify(elemento).toLowerCase().includes(buscar.toLowerCase());
            })
        )
    },[buscar, listaProductos]);

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <h2 className='font-bold text-4xl text-blue-500 my-5 text-center'> Inventario de productos</h2>
            <input placeholder='Buscar'
                value={buscar}
                onChange={(e)=>setBuscar(e.target.value)}
                className='border-2 border-gray-700 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500'
            />
            <table className='tabla border border-green-500 table-auto'>
                <thead>
                    <tr>
                        <th className='border border-blue-600'>ID</th>
                        <th className='border border-blue-600'>Nombre del producto</th>
                        <th className='border border-blue-600'>Línea</th>
                        <th className='border border-blue-600'>Variante</th>
                        <th className='border border-blue-600'> Orígen </th>
                        <th className='border border-blue-600'>Precio</th>
                        <th className='border border-blue-600'>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {datoFiltrado.map((productos) => {
                        return (
                            <FilaProducto key={nanoid()} productos={productos} setConsulta={setConsulta} getToken={getToken} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const FilaProducto = ({productos, setConsulta, getToken}) => {

    const [editar, setEditar] = useState(false);
    const [infoEditarProducto, setInfoEditarProducto] = useState({
        id:productos.id,
        nombre:productos.nombre,
        linea:productos.linea,
        variante:productos.variante,
        origen:productos.origen,
        precio:productos.precio,
    })

    const actualizarProducto = async ()=>{
        const options = {
            method: 'PATCH',
            url: `https://intense-castle-32619.herokuapp.com/productos/${productos._id}`,
            headers: {'Content-Type': 'application/json', Authorization: getToken()},
            data: { ...infoEditarProducto },
        };
          
        await axios
            .request(options)
            .then(function (response) {
            console.log(response.data);
            toast.success('Producto actualizado con éxito');
            setEditar(false);
            setConsulta(true);
            })
            .catch(function (error) {
            toast.error('Error actualizando producto');
            console.error(error);
        });

    }

    return(

        <tr>
        {editar ? (
            <>
            <td>
                <input type='number' value={infoEditarProducto.id} onChange={(e)=>setInfoEditarProducto({...infoEditarProducto, id:e.target.value})} />
            </td>
            <td>
                <input type='text' value={infoEditarProducto.nombre} onChange={(e)=>setInfoEditarProducto({...infoEditarProducto, nombre:e.target.value})}/>
            </td>
            <td>
            <select value={infoEditarProducto.linea} onChange={(e)=>setInfoEditarProducto({...infoEditarProducto, linea:e.target.value})} >
                <option disabled value={0}>Seleccione una línea</option>
                <option>Premium</option>
                <option>Hogar</option>
                <option>Sensación</option>
            </select>
            </td>
            <td>
            <select value={infoEditarProducto.variante} onChange={(e)=>setInfoEditarProducto({...infoEditarProducto, variante:e.target.value})} >
                <option disabled value={0}>Seleccione una variante</option>
                <option>Arabica</option>
                <option>Robusta</option>
                <option>Liberica</option>
            </select>
            </td>
            <td>
                <input type='text' value={infoEditarProducto.origen} onChange={(e)=>setInfoEditarProducto({...infoEditarProducto, origen:e.target.value})} />
            </td>
            <td>
                <input type='number' value={infoEditarProducto.precio} onChange={(e)=>setInfoEditarProducto({...infoEditarProducto, precio:e.target.value})} />
            </td>
            </>
        ):(
            <>
            <td>{productos.id}</td>
            <td>{productos.nombre}</td>
            <td>{productos.linea}</td>
            <td>{productos.variante}</td>
            <td>{productos.origen}</td>
            <td>{productos.precio}</td>
            </>
        )}
        <td>
            <div className='flex items-center justify-center'>
            {editar ? (
                <FontAwesomeIcon onClick={()=>actualizarProducto() } icon={faCheck} className='text-blue-400 hover:text-blue-900' />
            ):(
                <FontAwesomeIcon onClick={()=>setEditar(!editar)} icon={faEdit} className='text-blue-400 hover:text-blue-900' />
            )} 
            </div>
        </td>
        </tr>    
    )
}

export default GestionProductos;