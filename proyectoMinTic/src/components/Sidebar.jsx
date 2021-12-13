import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';
import { Link } from 'react-router-dom';
import useActiveRoute from 'hooks/useActiveRoute';
import ImagenSidebar from './ImagenSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

const SidebarLinks = () => {
  return (
    <ul className='mt-12'>
      <SidebarRoute to='' title='Inicio' icon='fas fa-home' />
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-smile-wink' />
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <SidebarRoute to='/inscripciones' title='Aprobacion Inscripciones' icon='fas fa-user' />
      </PrivateComponent>
      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebar-route text-red-700'>
        <div className='flex items-center'>
          <i className='fas fa-sign-out-alt' />
          <span className='text-sm  ml-2'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='logo.png' alt='Logo' className='h-16' />
      <span className='my-2 text-xl font-bold text-center'>Título de Mi Aplicación</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-indigo-700'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-400'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;

// const Sidebar = () => {
//   return (
//     <nav className='hidden lg:flex lg:w-72 border border-gray-300 h-full flex-col bg-gray-100 p-4 sidebar'>
//       <Link to='/Login'>
//         <ImagenSidebar />
//       </Link>

//       <div className='my-4'>
//         <Ruta icono='' ruta='/usuarios' nombre='Usuarios' />
//         <Ruta icono='' ruta='/proyectos' nombre='Proyectos' />
//         <Ruta icono='' ruta='/auth/login' nombre='Login' />
//       </div>
//       <button className='bg-indigo-500 p-1 text-white rounded-md shadow-md hover:bg-red-400'>
//        Cerrar Sesión
//       </button>
//     </nav>
//   );
// };

// const Ruta = ({ icono, ruta, nombre }) => {
//   const isActive = useActiveRoute(ruta);
//   return (
//     <Link to={ruta}>
//       <button
//         className={`p-1 my-2  bg-${
//           isActive ? 'indigo' : 'gray'
//         }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
//       >
//         <icon className={`${icono} w-10`} />
//         {nombre}
//       </button>
//     </Link>
//   );
// };

// export default Sidebar;
