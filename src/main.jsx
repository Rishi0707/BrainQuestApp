import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('main.jsx is executing');

const root = document.getElementById('root');
console.log('Root element:', root);

try {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
  console.log('React app mounted successfully');
} catch (error) {
  console.error('Error mounting React app:', error);
} 