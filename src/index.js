import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import OpenratesService from './services/openrates-service';
import {OpenratesServiceProvider} from './components/openrates-service-context';
import store from './store';

const openratesService = new OpenratesService();

ReactDOM.render(
  <Provider store={store}>
    <OpenratesServiceProvider value={openratesService}>
      <Router>
        <App/>
      </Router>
    </OpenratesServiceProvider>
  </Provider>,
  document.getElementById('root')
);
