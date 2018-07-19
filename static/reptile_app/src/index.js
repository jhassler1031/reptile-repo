import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
// import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import BaseLayout from './components/BaseLayout/BaseLayout.js';
import Vets from './components/vets/Vets.js';
import Stores from './components/stores/Stores.js';
import Illnesses from './components/illnesses/Illnesses.js';

ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path='/vets' component={Vets}/>
        <Route path='/stores' component={Stores}/>
        <Route path='/illnesses' component={Illnesses}/>
        <Route path='/' component={App}/>
      </Switch>
    </BaseLayout>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
