import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app-root'));

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  if (module.hot) module.hot.accept()
}
