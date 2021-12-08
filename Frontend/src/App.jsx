import 'App.css';
import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import GestionVentas from 'pages/GestionVentas';
import Usuarios from 'pages/GestionUsuarios';
import Login from 'pages/Login';
import GestionProductos from 'pages/GestionProductos';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
//import PrivateRoute from 'components/PrivateRoute';



function App() {
  return (
    <Auth0Provider domain="coffeecoders-mintic.us.auth0.com"
    clientId="edxTN4GxPbyqKvscYNUQgWamqbtkHUaa"
    redirectUri="https://cryptic-anchorage-66262.herokuapp.com/GestionUsuarios"
    audience="api-autenticacion-coffeecoders">
      <Router>
          <Switch>        
            <Route path={['/GestionUsuarios', '/GestionProductos', '/GestionVentas']}>
              <PrivateLayout>
                <Route path='/GestionUsuarios'>
                  <Usuarios/>
                </Route>
                <Route path='/Gestionproductos'>
        
                  <GestionProductos/>
                
                </Route>
                <Route path='/GestionVentas'>
                  <GestionVentas/>
                </Route>
              </PrivateLayout>
            </Route>
            <Route path={['/']}>
              <AuthLayout>
                <Route path='/'>
                  <Login/>
                </Route>
              </AuthLayout>
            </Route>
          </Switch>
      </Router>

    </Auth0Provider>

   
  )
}

export default App;
