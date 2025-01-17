import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer position={'bottom-right'}/>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);