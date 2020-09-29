import React from 'react';
import './App.css';
import Navbar from './component/layouts/Navbar';
import Footer from './component/layouts/Footer';
import Tours from './component/overview/Tours';
import Tour from './component/tour/Tour';
import {Switch, Route} from 'react-router-dom';
// Redux


const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Tours} />
        <Route exact path="/tours/:tourname/:tourid" component={Tour} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
