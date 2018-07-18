import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import BaseLayout from './components/BaseLayout/BaseLayout.js';

ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path='/' component={App}/>
      </Switch>
    </BaseLayout>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
