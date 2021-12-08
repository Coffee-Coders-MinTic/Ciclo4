import React, { useEffect, useState} from 'react';
import Sidebar from 'components/Sidebar';
import SidebarResponsive from 'components/SidebarResponsive';
import { useAuth0 } from "@auth0/auth0-react";
import obtenerUsuarioRegistrado from 'utils/api';


const PrivateLayout = ({ children }) => {

  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently} = useAuth0();
  const {loadingInfo, setLoadingInfo} = useState(true);

    useEffect(()=>{

      const fetchAuth0Token = async()=>{


          const accessToken = await getAccessTokenSilently({
              audience: 'api-autenticacion-coffeecoders',
          })
          localStorage.setItem('token',accessToken)
          await obtenerUsuarioRegistrado(
              (response)=>{
                  console.log('response',response)
                  setLoadingInfo(false);
              },
              (err)=>{
                  console.log('err',err);
                  setLoadingInfo(false);
              }
          )
      }
      if (isAuthenticated){
          fetchAuth0Token();
      }
  },[isAuthenticated, getAccessTokenSilently, setLoadingInfo])

  
  if (isLoading || loadingInfo) return <div>Loading...</div>;

  if (! isAuthenticated) {
      return loginWithRedirect();

  }

  return (

      <div className='flex w-screen h-screen'>
      <div className='flex flex-col lg:flex-row flex-nowrap h-full w-full'>
        <Sidebar />
        <SidebarResponsive />
        <main className='flex w-full  overflow-y-scroll items-center justify-center'>
          {children}
        </main>
      </div>
    </div>   
  );
};

export default PrivateLayout;
