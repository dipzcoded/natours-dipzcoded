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
import TourError from './component/tour/TourError';
import UserAccount from './component/account/UserAccount';
import PrivateRoute from './component/routing/PrivateRoute';
import ForgotPassword from './component/authenication/ForgotPassword';
import ResetPassword from './component/authenication/ResetPassword';
import BookingAccount from './component/bookings/BookingAccount';


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
        <Route exact path="" component={Tours} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:token" component={ResetPassword} />
        <PrivateRoute exact path="/user/account" component={UserAccount} />
        <PrivateRoute exact path="/user/bookings" component={BookingAccount} />
        <Route exact path="/tours/:tourname/:tourid" render={(rendProps) => <Tour {...rendProps} />} />
        <Route exact path="/tour/notfound" render={(rendProps) => <TourError {...rendProps} />} />
        <Route render={(renProps) => <TourError errDetails="Page Not Found" />} />
      </Switch>
      <Footer />
    </div>
  );
}



export default App;
