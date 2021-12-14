import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Tipo, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div className='p-10 flex flex-col'>
        <div className='flex w-full items-center justify-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Lista de Usuarios</h1>
        </div>
      </div>
      <div className='p-10 flex flex-col'>
        <table className='border-collapse border border-gray-400'>
          <thead>
            <tr>
              <th className='w-1/2 border border-gray-300 font-semibold p-4 text-gray-900 text-left'>Nombre Completo</th>
              <th className='w-1/2 border border-gray-300 font-semibold p-4 text-gray-900 text-left'>Correo</th>
              <th className='w-1/2 border border-gray-300 font-semibold p-4 text-gray-900 text-left'>Identificación</th>
              <th className='w-1/2 border border-gray-300 font-semibold p-4 text-gray-900 text-left'>Rol</th>
              <th className='w-1/2 border border-gray-300 font-semibold p-4 text-gray-900 text-left'>Estado</th>
              <th className='w-1/2 border border-gray-300 font-semibold p-4 text-gray-900 text-left'>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Usuarios ? (
              <>
                {data.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td className='border border-gray-300 p-4 text-gray-500'>{u.nombreCompleto}</td>
                      <td className='border border-gray-300 p-4 text-gray-500'>{u.correo}</td>
                      <td className='border border-gray-300 p-4 text-gray-500'>{u.identificacion}</td>
                      <td className='border border-gray-300 p-4 text-gray-500'>{Enum_Tipo[u.tipo]}</td>
                      <td className='border border-gray-300 p-4 text-gray-500'>{Enum_EstadoUsuario[u.estado]}</td>
                      <td className='border border-gray-300 p-4 text-gray-500'>
                        <Link to={`/usuarios/editar/${u._id}`} className='bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400'>
                          Editar
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;
