import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.scss';
import './config.js';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
