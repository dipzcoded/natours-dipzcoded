import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {getBookingsByUser} from '../../actions/bookings'
import ToursItem from '../overview/ToursItem';
import Loader from '../layouts/Loader'
import {Helmet} from 'react-helmet'
import queryString from 'query-string';
import {setAlert} from '../../actions/alert'
import {withRouter} from 'react-router-dom'
const BookingAccount = ({getBookingsByUser, setAlert, booking : {bookings, isLoading}, history, location}) => {

    useEffect(() => {
        getBookingsByUser();
        
        if(location.search)
        {
            const parse = queryString.parse(location.search)
            console.log(parse.alert);
            if(parse.alert === "booking")
            {
                setAlert('booking successful','success')
                history.push('/user/bookings');
                window.history.pushState(null, document.title, window.location.href);
                window.addEventListener('popstate', function (event){
                    window.history.pushState(null, document.title,  window.location.href);
                });
            }
           
        }

    },[location,getBookingsByUser, history])

    // creating the touritem card
    const bookedTourCard = bookings.map((booking) => (
        <ToursItem tour={booking} key={booking._id} />
    ));
   

    return (
        <Fragment>
            {bookings.length === 0 & isLoading ? (<Loader />) : (
                <main className="main">
                <Helmet>
        <title>Natours | Booked Tours</title>
                </Helmet>
                <div className="card-container">
                   {bookings.length === 0 ? (<h1 style={{
                       gridColumn : " 1 / -1",
                       justifySelf : "center",
                       fontSize : "20px"
                   }}> No Bookings Made By You</h1>) : (
                    bookedTourCard
                   )}
                </div>
            </main>
            ) }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    booking : state.booking
})

export default connect(mapStateToProps,{getBookingsByUser,setAlert})(withRouter(BookingAccount))
