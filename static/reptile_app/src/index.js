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
import MyVets from './components/vets/MyVets.js';
import MyStores from './components/stores/MyStores.js';
import MyIllnesses from './components/illnesses/MyIllnesses.js';
import Signup from './components/signup/Signup.js';

ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path='/myvets' component={MyVets}/>
        <Route path='/vets' component={Vets}/>
        <Route path='/mystores' component={MyStores}/>
        <Route path='/stores' component={Stores}/>
        <Route path='/myillnesses' component={MyIllnesses}/>
        <Route path='/illnesses' component={Illnesses}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/' component={App}/>
      </Switch>
    </BaseLayout>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
