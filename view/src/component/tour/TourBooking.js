import React from 'react'
import LogoWhite from '../../img/logo-white.png';

const TourBooking = ({images}) => {
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
            <button className="btn btn--green span-all-rows">Book tour now!</button>
            </div>
        </div>
        </section>
    )
}

export default TourBooking
