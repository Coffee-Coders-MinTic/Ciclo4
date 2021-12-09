import React from 'react';
import Google from 'media/google_logo.png';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <h2 className='m-3 text-center text-3xl font-extrabold text-gray-900'>
        Inicia sesión en tu cuenta
      </h2>
      <form className='mt-8 max-w-md'>
        <div>
          <input
            className='appearance-none rounded-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 hover:border-gray-500 sm:text-sm'
            type='email'
            placeholder='correo@c.com'
            required
          />
          <input
            className='appearance-none rounded-none relative block w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 hover:border-gray-500 sm:text-sm'
            type='password'
            placeholder='Contraseña'
            required
          />
        </div>
        <div className='flex justify-between'>
          <div>
            <label htmlFor='recuerdame'>
              <input type='checkbox' name='recuerdame'className='' />
                Recuérdame
            </label>
          </div>
          <div>
            <Link to='/'>¿Olvidaste tu contraseña?</Link>
          </div>
        </div>
        <div>
          <Link to='/interfazusuarios'>
            <button type='submit' 
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
            {/* className='rounded-full py-3 px-6 bg-indigo-500 p-2 my-4 text-white shadow-md hover:bg-indigo-700'> */}
                Iniciar Sesion
            </button>
          </Link>
        </div>
        <div className='flex items-center justify-center'>
        <span className='mx-4'>------------------------</span>
        <h2 className='my-4 text-center text-sm font-extrabold text-gray-900'>O</h2>
        <span className='mx-4'>------------------------</span>
        </div>
        <div>
          <Link to='/interfazusuarios'>
            <GoogleLogin
              clientId="62092738893-5kelfu8ijpf1kqn4vuo5r2i7duurquu2.apps.googleusercontent.com"
              redirectUri="http://localhost:3000/InterfazUsuarios"
              //buttonText="Continúa con Google"
              render={renderProps => (
                
                  <button onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    type='submit'
                    className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
                    <div className='flex items-center justify-start'>
                      <img src={Google} alt='Logo Google' className='h-6 w-6' />
                      <span className='mx-4'>Continúa con Google</span>
                    </div>
                  </button>
                
              )}
              onSuccess={respuestaGoogle}
              onFailure={respuestaGoogle}
              cookiePolicy={'single_host_origin'}
            />
            </Link>
          {/* <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-indigo-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
            <div className='flex items-center justify-start'>
              <img src={Google} alt='Logo Google' className='h-6 w-6' />
              <span className='mx-4'>Continúa con Google</span>
            </div>
          </button> */}
            {/* <button className='bg-indigo-200 p-2 my-4 text-black rounded-lg shadow-md hover:bg-indigo-300'>
              Continua con google
            </button> */}
        </div>
      </form>
    </div>
  );
};

const respuestaGoogle = (respuesta) => {
  return 
}

export default Login;

