import React from 'react';
import { Link } from 'react-router-dom';
import useActiveRoute from 'hooks/useActiveRoute';
import ImagenSidebar from './ImagenSidebar';
import { useAuth0 } from "@auth0/auth0-react";


const Sidebar = () => {
  const { logout } = useAuth0();

  const cerrarSesion=()=>{
    logout({ returnTo: window.location.origin })
    localStorage.setItem('token',null)
  }

  return (
    <nav className='hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-gray-100 p-4 sidebar'>
      <Link to='/Login'>
        <ImagenSidebar />
      </Link>

      <div className='my-4'>
        <Ruta icono='' ruta='/GestionUsuarios' nombre='Usuarios' />
        <Ruta icono='' ruta='/GestionVentas' nombre='Ventas' />
        <Ruta icono='' ruta='/GestionProductos' nombre='Productos'/>
      </div>
      <button onClick={() => cerrarSesion() } className='bg-red-400 p-1 text-white rounded-md shadow-md hover:bg-red-600'>
       Cerrar Sesión
      </button>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre }) => {
  return (
    <Link to={ruta}>
      <button
        className='flex w-full items-center my-2 bg-indigo-500 p-1 text-white rounded-md shadow-md hover:bg-red-400'
      >
        <icon className={`${icono} w-10`} />
        {nombre}
      </button>
    </Link>
  );
};

export default Sidebar;
