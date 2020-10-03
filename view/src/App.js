import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './component/layouts/Navbar';
import Footer from './component/layouts/Footer';
import Tours from './component/overview/Tours';
import Tour from './component/tour/Tour';
import Login from './component/authenication/Login';
import Register from './component/authenication/Register';
import ALert from './component/layouts/Alert';
import Alert from './component/layouts/Alert';

const App = () => {
  return (
    <div>
      <Navbar />
      <Alert /> 
      <Switch>
        <Route exact path="/" component={Tours} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/tours/:tourname/:tourid" component={Tour} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
