import 'react-toastify/dist/ReactToastify.css';
import 'styles/EstiloGestionVentas.css';
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import IconoVentas from 'media/IconoVentas.png';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import axios from 'axios';


const GestionVentas=()=>{
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');
    const [consulta, setConsulta] = useState(true);

    const getToken =()=>{
        return `Bearer ${localStorage.getItem('token')}`;
    }

    useEffect(() => {
        const obtenerGestionVentas = async ()=>{
            const options = {
                method: 'GET',
                url: 'https://intense-castle-32619.herokuapp.com/ventas/',
                headers: {'Content-Type': 'application/json', Authorization: getToken()}
              };
             await axios.request(options).then(function (response) {
                setVentas(response.data);
              }).catch(function (error) {
                console.error(error);
              });
        };
        if (consulta){
            obtenerGestionVentas();
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
          setTextoBoton('Crear Nueva Venta');
        } else {
          setTextoBoton('Listar Ventas');
        }
      }, [mostrarTabla]);

    return(
        <div>
            <h2 className='font-bold text-4xl text-center text-yellow-400 my-2'>Administración de Ventas</h2>
            <div align='right'>
                <button onClick={() => {setMostrarTabla(!mostrarTabla);}}
                        className={`text-white font-bold bg-green-500 p-5 rounded-full m-6 w-28 self-end`}>
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (
            <TablaVentas listaVentas={ventas} setConsulta={setConsulta} getToken={getToken} />
        ) : (
            <RegistroVentas
            setMostrarTabla={setMostrarTabla}
	        listaVentas={ventas}
            setVentas={setVentas}
            getToken={getToken}
            />
        )}
        <ToastContainer position='bottom-center' autoClose={5000} />     
        </div>
    )

}


const RegistroVentas=({setMostrarTabla, listaVentas, setVentas, getToken})=>{

    const form = useRef(null);

    const submitForm = async(e) => {
        e.preventDefault();
        const regventas = new FormData(form.current);

        const nuevaVenta = {};
            regventas.forEach((value, key) => {
            nuevaVenta[key] = value;
            });

            const options = {
                method: 'POST',
                url: 'https://intense-castle-32619.herokuapp.com/ventas/',
                headers: { 'Content-Type': 'application/json', Authorization: getToken() },
                data: { iD: nuevaVenta.iD, total: nuevaVenta.total, cantidad: nuevaVenta.cantidad, preciounitario: nuevaVenta.preciounitario, fechaventa: nuevaVenta.fechaventa, vendedor: nuevaVenta.vendedor, identificacioncliente: nuevaVenta.identificacioncliente, nombrecliente: nuevaVenta.nombrecliente, estadoventa: nuevaVenta.estadoventa},
                };
                  
            await axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    toast.success('Venta añadida con éxito');
                })
                .catch(function (error) {
                    console.error(error);
                    toast.error('Error creando la venta');
                });

            setMostrarTabla(true)        
            setVentas([...listaVentas, nuevaVenta]);              
        
    }

    return(
            <div className='flex flex-col items-center justify-center'>   
             <img src={IconoVentas} alt='imagen' className='h-40 w-auto my-7 rounded-full' />   
            <form ref={form} onSubmit={submitForm} className='flex flex-col justify-center'>
                <h1 className='font-bold text-3xl text-green-500 my-5 text-center'> Registro de Ventas</h1>
                <div className='flex flex-row justify-center'>
                <label className='flex flex-col mx-5' htmlFor='iD'> 
                    ID único de venta
                    <input 
                        name='iD' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='1120' 
                        required/>
                </label>
                <label className='flex flex-col' htmlFor='total'> 
                Total de la venta
                    <input 
                        name='total' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='5000' 
                        required/>
                </label>
                </div>
                <div className='flex flex-row'>
                <label className='flex flex-col mx-5' htmlFor='cantidad'> 
                Cantidad de unidades
                    <input 
                        name='cantidad' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='3' 
                        required/>
                </label>
                <label className='flex flex-col' htmlFor='preciounitario'> 
                    Precio unitario 
                    <input 
                        name='preciounitario' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='1000' />
                </label>
                <label className='flex flex-col' htmlFor='fechaventa'> 
                    Fecha de venta 
                    <input 
                        name='fechaventa' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='date' 
                        placeholder='20-02-2022' />
                </label>
                </div>
                <div className='flex flex-row justify-center'>
                <label className='flex flex-col' htmlFor='identificacioncliente'> 
                    Identificación cliente 
                    <input 
                        name='identificacioncliente' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='number' 
                        placeholder='1125635987' />
                </label>
                <label className='flex flex-col' htmlFor='nombrecliente'> 
                    Nombre del cliente
                    <input 
                        name='nombrecliente' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='text' 
                        placeholder='Mario H' />
                </label>
                <label className='flex flex-col' htmlFor='vendedor'> 
                    Nombre del vendedor 
                    <input 
                        name='vendedor' 
                        className='bg-yellow-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        type='text' 
                        placeholder='Maria C' />
                </label>
                <label className='flex flex-col' htmlFor='estadoventa'>
                   Estado venta
                    <select
                        className='bg-gray-50 border border-green-600 p-2 rounded-lg my-2 w-50'
                        name='estadoventa'
                        defaultValue={0}>

                        <option disabled value={0}>Elija una opción</option>
                        <option>En proceso</option>
                        <option>Entregada</option>
                        <option>Cancelada</option>
                    </select>
                </label>
                </div>
                
                                
            <div className='my-4' align='center'>
                    <button type='submit'className='bg-green-500 text-white font-bold rounded-full p-2'>
                  Guardar Datos
                </button>
            </div>
        </form>
        </div>  
        
    )
}

const TablaVentas=({listaVentas, setConsulta, getToken})=>{

    const [buscar, setBuscar] = useState('');
    const [datoFiltrado, setDatoFiltrado] = useState(listaVentas)

    useEffect(()=>{
        setDatoFiltrado(
            listaVentas.filter((elemento)=>{
                return JSON.stringify(elemento).toLowerCase().includes(buscar.toLowerCase());
            })
        )
    },[buscar, listaVentas]);

    return(
            <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='font-bold text-4xl text-green-500 my-5 text-center'> Listado de Ventas</h1>
                <input placeholder='Buscar'
                value={buscar}
                onChange={(e)=>setBuscar(e.target.value)}
                className= 'border-2 border-green-700 px-3 py-1 rounded-md focus:outline-none focus:border-green-500'
                />
                <table className='tabla border border-green-500 table-auto'>
                    <thead>
                    <tr>
                        <th className='border border-green-600'>ID</th>
                        <th className='border border-green-600'>Total</th>
                        <th className='border border-green-600'>Cantidad</th>
                        <th className='border border-green-600'>Precio unitario</th>
                        <th className='border border-green-600'>Fecha de Venta</th>
                        <th className='border border-green-600'>ID cliente</th>
                        <th className='border border-green-600'>Nombre cliente</th>
                        <th className='border border-green-600'>Vendedor</th>
                        <th className='border border-green-600'>Estado venta</th>
                        <th className='border border-green-600'>Editar datos</th>
                    </tr>
                    </thead>
                    <tbody>
                        {datoFiltrado.map((ventas) => {
                        return (
                            <FilaVentas key={nanoid()} ventas={ventas} setConsulta={setConsulta} getToken={getToken}/>
                            );
                            }   
                            )
                        }
                    </tbody>
                </table>
            </div>
    )
}

const FilaVentas = ({ventas, setConsulta, getToken})=>{

    const [editar, setEditar] = useState(false);
    const [infoEditarVentas, setInfoEditarVentas] = useState({   

        iD:ventas.iD, 
        total:ventas.total,
        cantidad:ventas.cantidad,
        preciounitario:ventas.preciounitario, 
        fechaventa:ventas.fechaventa, 
        identificacioncliente:ventas.identificacioncliente,
        nombrecliente:ventas.nombrecliente, 
        vendedor:ventas.vendedor,
        estadoventa:ventas.estadoventa, 
        
    })

    const actualizarVentas = async ()=>{
        const options = {
            method: 'PATCH',
            url: `https://intense-castle-32619.herokuapp.com/ventas/${ventas._id}`,
            headers: {'Content-Type': 'application/json', Authorization: getToken()},
            data: { ...infoEditarVentas },
          };
          
          await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('Venta modificada con éxito');
            setEditar(false);
            setConsulta(true);
          }).catch(function (error) {
            toast.error('Error modificando los datos de la venta');
            console.error(error);
          });

    }

    return(
        <tr>
        {editar ? (
            <>
            <td>
                <input type='text' value={infoEditarVentas.iD} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, iD:e.target.value})} />
            </td>
            <td>
                <input type='text' value={infoEditarVentas.total} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, total:e.target.value})}/>
            </td>
            <td>
                <input type='text' value={infoEditarVentas.cantidad} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, cantidad:e.target.value})}/>
            </td>
            <td>
                <input type='text' value={infoEditarVentas.preciounitario} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, preciounitario:e.target.value})}/>
            </td>
            <td>
                <input type='text' value={infoEditarVentas.fechaventa} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, fechaventa:e.target.value})}/>
            </td>
            <td>
                <input type='text' value={infoEditarVentas.identificacioncliente} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, identificacioncliente:e.target.value})}/>
            </td>
            <td>
                <input type='text' value={infoEditarVentas.nombrecliente} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, nombrecliente:e.target.value})}/>
            </td>           
            <td>
                <input type='text' value={infoEditarVentas.vendedor} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, vendedor:e.target.value})}/>
            </td>
            <td>
            <select value={infoEditarVentas.estadoventa} onChange={(e)=>setInfoEditarVentas({...infoEditarVentas, estadoventa:e.target.value})} >
                <option disabled value={0}>Elija una opción</option>
                <option>En proceso</option>
                <option>Entregada</option>
                <option>Cancelada</option>
            </select>
            </td>
            </>
        ):(
            <>
            <td>{ventas.iD}</td>
            <td>{ventas.total}</td>
            <td>{ventas.cantidad}</td>
            <td>{ventas.preciounitario}</td>
            <td>{ventas.fechaventa}</td>
            <td>{ventas.identificacioncliente}</td>
            <td>{ventas.nombrecliente}</td>
            <td>{ventas.vendedor}</td>
            <td>{ventas.estadoventa}</td>             
            </>
        )}
        <td>
            <div className='flex items-center justify-center'>
            {editar ? (
                <FontAwesomeIcon onClick={()=>actualizarVentas() } icon={faCheck} className='text-green-400 hover:text-yellow-900' />
            ):(
                <FontAwesomeIcon onClick={()=>setEditar(!editar)} icon={faEdit} className='text-green-400 hover:text-yellow-900' />
            )} 
            </div>
        </td>
        </tr>       
    )
}

export default GestionVentas;