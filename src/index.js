import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import objectFitImages from 'object-fit-images';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

objectFitImages();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
