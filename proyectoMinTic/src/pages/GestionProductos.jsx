import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom' //Es necesario anexar a demás páginas
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const productosBackend = [
    {
        id: '001',
        nombre: 'Deluxe',
        linea: 'Premium',
        variante: 'Castilla',
        origen: 'Putumayo',
        precio: 27000,
    },
    {   
        id: '002',
        nombre: 'Primavera',
        linea: 'Hogar',
        variante: 'Castilla',
        origen: 'Putumayo',
        precio: 15000,
    },
    {
        id: '003',
        nombre: 'Doña Luisa',
        linea: "Sensacion",
        variante: 'Castilla',
        origen: 'Putumayo',
        precio: 19000,
    },
];


const GestionProductos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos]  = useState([]);
    const [textoBoton, setTextoBoton] = useState('Registra un producto');
    const [colorBoton, setColorBoton] = useState('green-200');

    useEffect(() => {
        //obtener lista de vehiculos desde el backend
        setProductos(productosBackend);
    }, []);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Registra un producto');
            setColorBoton('green');
        } else {
            setTextoBoton('Ver el inventario');
            setColorBoton('green');
        }
    }, [mostrarTabla]);
    return (
        <body className='bg-gray-100'>
            <div className='w-screen h-screen justify-center items-center flex flex-col'>
                <h1 className='text-4xl text-center text-gray-800 my-2 font-bold font-sans w-full' >Registro de productos</h1>
                <div>
                    <button 
                        onClick={()=>{setMostrarTabla(!mostrarTabla);
                        }}
                        className={`bg-${colorBoton}-500 p-1 rounded-full font-sans text-white `}
                    >
                        {textoBoton}
                    </button>
                    {mostrarTabla ? (
                        <TablaProductos listaProductos={productos} />
                    ) : (
                        <FormularioRegistroProductos 
                            fMostrarTabla={setMostrarTabla}
                            listaProductos={productos}
                            fAgregarProducto={setProductos} />
                    )}
                    <ToastContainer position="bottom-center" autoClose={5000} />
                </div>
            </div>    
        </body>
    );
};


const TablaProductos = ({listaProductos}) => {
    return (
        <div className='flex flex-col items-center font-sans justify-center'>
            <table className='p-2 m-2 items-center'>
                <thead className='bg-green-500 text-white'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del producto</th>
                        <th>Linea</th>
                        <th>Variante</th>
                        <th>Orígen</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProductos.map((producto) => {
                        return (
                            <tr>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.linea}</td>
                                <td>{producto.variante}</td>
                                <td>{producto.origen}</td>
                                <td>{producto.precio}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const FormularioRegistroProductos = ({fMostrarTabla, listaProductos, fAgregarProducto,}) => {
    const [id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [linea, setLinea] = useState("")
    const [variante, setVariante] = useState("")
    const [origen, setOrigen] = useState("")
    const [precio, setPrecio] = useState("")

    const enviarAlBackend = () => {
        console.log('Id', id, 'Nombre', nombre, 'Linea', linea, 'Variante', variante, 'Origen', origen, 'Precio', precio);
        if(id === "" || nombre === "" || linea === "" || variante === "" || origen === "" || precio === "" ) {
            toast.error('Diligencie el formulario completo');
        } else {
            toast.success('¡Su producto ha sido registrado exitosamente!');
            fMostrarTabla(true);
            fAgregarProducto([
                ...listaProductos, 
                {id:id, nombre:nombre, linea:linea, variante:variante, origen:origen, precio:precio },
           ]);
        } 
    };   

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2x1 font-bold text-gray-800 font-sans items-center justify-center'>Ingresa un nuevo producto</h2>
            <form className='grid grid-cols-2 font-sans'>
                <label className='flex flex-col' htmlFor='id'>
                    ID
                    <input 
                    name='id'
                        className='text-xs bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 font-sans' 
                        type='number' 
                        placeholder='08937'
                        value={id} 
                        onChange={(e) => {
                        setId(e.target.value);
                        }}
                        required
                    />
                </label>
                <label className='flex flex-col' htmlFor='nombre'>
                    Nombre
                    <input 
                        name='nombre'
                        className='text-xs bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text' 
                        placeholder='Juan Valtez'
                        value={nombre} 
                        onChange={(e) => {
                            setNombre(e.target.value);
                        }}
                        required
                    />
                </label>
                <label className='flex flex-col' htmlFor='linea'>
                    Linea
                    <select
                        name='linea'
                        className='text-xs bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        value={linea} 
                        onChange={(e) => {
                            setLinea(e.target.value);
                        }}  
                    >
                        <option disable>Seleccione una linea</option>
                        <option>Premium</option>
                        <option>Hogar</option>
                        <option>Sensacion</option>
                    </select>
                </label>
                <label className='flex flex-col' htmlFor='variante'>
                    Variante
                    <select           
                        name='variante' 
                        className='text-xs bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        value={variante} 
                        onChange={(e) => {
                            setVariante(e.target.value);
                        }}  
                    >
                        <option disable>Seleccione una variante</option>
                        <option>Arabica</option>
                        <option>Robusta</option>
                        <option>Liberica</option>
                    </select>
                </label>    
                <label className='flex flex-col' htmlFor='origen'>
                    Origen
                    <input 
                        name='origen'
                        className='text-xs bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text' 
                        placeholder='Putumayo'
                        value={origen} 
                        onChange={(e) => {
                            setOrigen(e.target.value);
                        }}
                        required  
                    />
                </label>       
                <label className='flex flex-col' htmlFor='precio'>
                    Precio
                    <input 
                        name='precio'
                        className='text-xs bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number' 
                        placeholder='30000'
                        value={precio} 
                        onChange={(e) => {
                            setPrecio(e.target.value);
                        }}
                        required
                    />
                </label>  
                <button 
                    type='submit' 
                    className='col-span-2 bg-green-400 p-1 rounded-full shadow-md hover:bg-green-500 text-white'
                    onClick={()=>{enviarAlBackend();
                    }}
                >
                    Guardar producto
                </button>
            </form>
        </div>
    );
};

export default GestionProductos;