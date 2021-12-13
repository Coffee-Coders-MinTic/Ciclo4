import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          Layout de Autenticacion Desplegado
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;


// import ImagenLogin from 'components/ImagenLogin';
// import React from 'react';
// import { Link } from 'react-router-dom';

// const AuthLayout = ({ children }) => {
//   return (
//     <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8'>
//       <div className='w-full flex items-start'>
//         <Link to='/'>
//           <i className='fas fa-home cursor-pointer hover:text-indigo-500' />
//         </Link>
//       </div>
//       <div className='max-w-md w-full'>
//         <ImagenLogin />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;
