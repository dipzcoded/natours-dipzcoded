import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';
import mapboxgl from 'mapbox-gl';
import {IconContext} from 'react-icons'

// init access token
mapboxgl.accessToken = "pk.eyJ1IjoiZGlwemNvZGVkIiwiYSI6ImNrZm44cW1rajA4YjEyc29lMGw0b3NvaXoifQ.Ra2YANwYtJvWUICVbUgaDA";
     

ReactDOM.render(
  <React.StrictMode>
    
    <Provider store={store}>
    <Router>
    <App />
    </Router>  
    </Provider>
   
  
  </React.StrictMode>,
  document.getElementById('root')
);


