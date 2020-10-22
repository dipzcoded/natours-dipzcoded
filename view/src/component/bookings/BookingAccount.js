import React,{useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {getBookingsByUser} from '../../actions/bookings'
import ToursItem from '../overview/ToursItem';
import Loader from '../layouts/Loader'
import {Helmet} from 'react-helmet'
const BookingAccount = ({getBookingsByUser, booking : {bookings, isLoading}}) => {

    useEffect(() => {
        getBookingsByUser();
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

export default connect(mapStateToProps,{getBookingsByUser})(BookingAccount)
