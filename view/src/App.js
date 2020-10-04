import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './component/layouts/Navbar';
import Footer from './component/layouts/Footer';
import Tours from './component/overview/Tours';
import Tour from './component/tour/Tour';
import Login from './component/authenication/Login';
import Register from './component/authenication/Register';
import Alert from './component/layouts/Alert';
import Cookies from 'js-cookie'
import {loadUser} from './actions/auth';
import store from './store';
import sethAuthToken from './utlis/setAuthToken';

const token = Cookies.get('jwt');
if(token)
{
  sethAuthToken(token);
}


const App = () => {

  useEffect(() => {

      store.dispatch(loadUser());

  },[])



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
