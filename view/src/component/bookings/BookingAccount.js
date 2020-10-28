import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {getBookingsByUser} from '../../actions/bookings'
import ToursItem from '../overview/ToursItem';
import Loader from '../layouts/Loader'
import {Helmet} from 'react-helmet'
import queryString from 'query-string';
import {setAlert} from '../../actions/alert'
import {withRouter} from 'react-router-dom'
import NatoursFav from '../../img/favicon.png'
const BookingAccount = ({getBookingsByUser, booking : {bookings, isLoading}, history, location}) => {

    useEffect(() => {
        getBookingsByUser();
        
        if(location.search)
        {
            const parse = queryString.parse(location.search)
            if(parse.alert)
            {
            setAlert('Your booking was successful! Please check your email for a confirmation. if your booking doesnt show up here immediatly, please come back later.', 'success',3000)
                setTimeout(() => {
                    history.push('/user/bookings');
                },4000)
            }
        }

    },[])

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
                       gridColumn : " 1 / -1"
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

export default connect(mapStateToProps,{getBookingsByUser})(withRouter(BookingAccount))
