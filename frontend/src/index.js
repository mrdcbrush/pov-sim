import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Faro
import { matchRoutes } from 'react-router-dom';
import { initializeFaro, createReactRouterV6DataOptions, ReactIntegration, getWebInstrumentations, } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

// Add before the if statement  
console.log('Faro URL:', process.env.REACT_APP_FARO_URL);  
console.log('All env vars:', process.env);  

//initalize Faro
// eslint-disable-next-line no-undef
const faroUrl = window.ENV?.REACT_APP_FARO_URL || process.env.REACT_APP_FARO_URL;
console.log('Initializing Faro with URL:', faroUrl);
if (faroUrl) {
  try {
    initializeFaro({
      // eslint-disable-next-line no-undef
      url: faroUrl,
      app: {
        name: 'pov-sim-frontend',
        // eslint-disable-next-line no-undef
        version: window.ENV?.REACT_APP_VERSION || process.env.REACT_APP_VERSION || '1.0.0',
        // eslint-disable-next-line no-undef
        environment: window.ENV?.REACT_APP_ENVIRONMENT || process.env.REACT_APP_ENVIRONMENT || 'dev',
      },
    instrumentations: [
      // eslint-disable-next-line no-undef
      ...getWebInstrumentations({  
      enablePerformanceInstrumentation: true,  
      trackResources: true  
      }),
      new TracingInstrumentation(),
      new ReactIntegration({
        router: createReactRouterV6DataOptions({
          matchRoutes,
        }),
      }),
    ],
  });
  console.log('Faro initialized successfully');
} catch (error) {
  console.error('Failed to initialize Faro:', error);
}
} else {
  console.warn('Faro URL not configured, skipping initialization');
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
