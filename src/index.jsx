import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EntrenamientosProvider } from './context/EntrenamientosContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <EntrenamientosProvider>
      <App />
    </EntrenamientosProvider>
  </React.StrictMode>
);
