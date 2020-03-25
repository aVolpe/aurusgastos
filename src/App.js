import React from 'react';
import './App.css';
import {Home} from './componentes/home';
import {Expediente} from './componentes/expedientes';
import {Gasto} from './componentes/gastos';

import Login from './componentes/login';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import {Navigation} from './componentes/navigation';
import {
  IntlMixin, IntlProvider, 
} from 'react-intl';
import history from './utils/history';

function App() {
  return (
    <IntlProvider locale="es">
      <BrowserRouter>
        <div className="container">
            <h3 className="m-3 d-flex justify-content-center">
              Aurus Software
            </h3>
            <h5 className="m-3 d-flex justify-content-center">
              App de Gestión de Gastos Jurídicos
            </h5>
            <Navigation />
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/expedientes/:id/gastos' component={Gasto} exact />     
              <Route path='/expedientes' component={Expediente} exact />
                   
            </Switch>
          
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
