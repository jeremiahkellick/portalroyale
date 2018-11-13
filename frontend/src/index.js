import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/main.css';
import Root from './components/root';
import configureStore from './store/store';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<Root store={store} />, root);

  serviceWorker.unregister();

});
