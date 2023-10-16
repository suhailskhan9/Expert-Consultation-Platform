
import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextProvider } from './SocketContext';
import './styles.css';

// const root=document.getElementById('root');
// const rootElement=createRoot(root);
// rootElement.render(
//   <ContextProvider>
//     <App />
//   </ContextProvider>
// )
ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root'),
);