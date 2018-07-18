import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/popper.js/dist/popper.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import BaseLayout from './components/BaseLayout/BaseLayout.js';
import Vets from './components/vets/Vets.js';
import Stores from './components/stores/Stores.js';

ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path='/vets' component={Vets}/>
        <Route path='/stores' component={Stores}/>
        <Route path='/' component={App}/>
      </Switch>
    </BaseLayout>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
