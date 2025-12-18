import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Import Faro
import { initializeFaro } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

//initalize Faro
// eslint-disable-next-line no-undef
if (process.env.REACT_APP_FARO_URL) {
  initializeFaro({
    // eslint-disable-next-line no-undef
    url: process.env.REACT_APP_FARO_URL,
    app: {
      name: 'pov-sim-frontend',
      // eslint-disable-next-line no-undef
      version: process.env.REACT_APP_VERSION || '1.0.0',
      // eslint-disable-next-line no-undef
      environment: process.env.REACT_APP_ENVIRONMENT || 'dev',
    },
    instrumentations: [
      new TracingInstrumentation(),
    ],
  });
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
