import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import {getAllTours} from '../../actions/tours';
import ToursItem from './ToursItem'
import {Helmet} from 'react-helmet'
import queryString from 'query-string';
import {createBookings} from '../../actions/bookings'
import Loader from '../layouts/Loader';
import {withRouter} from 'react-router-dom';

const Tours = ({tours : {tours},getAllTours, location,createBookings, isAuthenticated, history}) => {

    useEffect(() => {
        getAllTours();
        if(location.search)
        {
           const {tour, user,price} = queryString.parse(location.search);
         
           createBookings({tour,user,price}, history)

        }
    },[getAllTours, location])

    if(isAuthenticated)
    {
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    }




    // creating the touritem card
    const tourItemCard = tours.map((tour) => (
        <ToursItem tour={tour} key={tour._id} />
    ))

    return (
        <Fragment>
            {tours.length === 0 ? (<Loader />) : (
                <main className="main">
                <Helmet>
        <title>Natours | Natours | Exciting tours for adventurous people</title>
                </Helmet>
                <div className="card-container">
                    {/* tour items */}
                    {tourItemCard}
                </div>
            </main>
            ) }
        </Fragment>
    )
}

const mapsStateToProps = state =>({
    tours : state.tours,
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapsStateToProps, {getAllTours, createBookings})(withRouter(Tours))
