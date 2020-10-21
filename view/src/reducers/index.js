import {combineReducers} from  'redux';
import tours from './tours';
import auth from './auth';
import alert from './alert';
import booking from './bookings';

export default combineReducers({
    alert,
    tours,
    auth,
    booking
})