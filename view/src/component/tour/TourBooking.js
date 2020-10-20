import React from 'react'
import LogoWhite from '../../img/logo-white.png';
import {connect} from 'react-redux';
import {Link} from "react-router-dom"
import {bookingTour} from '../../actions/tours';

const TourBooking = ({images, bookingTour, isAuthenticated, isProcessing, tourid}) => {


    const onClick = (e) => {
        e.preventDefault();
        bookingTour(tourid)
    }

    return (
        <section className="section-cta">
            <div className="cta">
            <div className="cta__img cta__img--logo">
            <img src={LogoWhite} alt="Natours Logo" />
            </div>
            {
                images.slice(0,images.length - 1).map((img, index) => (
                    <img src={`/img/tours/${img}`} className={`cta__img cta__img--${index + 1}`} key={index} alt="Bookings Images"/>
                ))
            }

            <div className="cta__content">
            <h2 className="heading-secondary">what are you waiting for? </h2>
            <p className="cta__text">
            10 days. 1 adventure. Infinite memories. Make it yours today!
            </p>
        {isAuthenticated ? (<button className="btn btn--green span-all-rows" onClick={onClick}>{isProcessing ? "Processing" : "Book tour now!"}</button>) : (<Link className="btn btn--green span-all-rows" to="/login">Log in To book</Link>)}
            </div>
        </div>
        </section>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    isProcessing : state.tours.isProcessing
})

export default connect(mapStateToProps, {bookingTour})(TourBooking)
