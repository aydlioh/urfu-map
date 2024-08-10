import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Loader } from './components';
import { locations } from './data';
import { Map } from './widgets';
import './index.css';

serviceWorkerRegistration.register();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Loader />
    <div className="app">
      <Map locations={locations} />
      <Footer />
    </div>
  </React.StrictMode>
);
