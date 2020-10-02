import React,{Fragment} from 'react';
import icons from '../../img/icons.svg'
import {formatDate} from '../../Helper';
import TourReview from './TourReview';
import TourBooking from './TourBooking'
import TourMap from './TourMap';

const TourView = ({tour}) => {

    const dates = tour.startDates[1].split('-');
    const tourGuides = tour.guides.map(guide => (
        <div className="overview-box__detail" key={guide._id}>
            <img src={`/img/users/${guide.photo}`} alt="lead-guide" className="overview-box__img" />
    <span className="overview-box__label">{guide.role}</span>
    <span className="overview-box__text">{guide.name}</span>
        </div>
    ));
    
    

    const tourImages = tour.images.map((img,index) => (
        <div className="picture-box" key={index}>
            <img src={`/img/tours/${img}`} className={`picture-box__img picture-box__img--${index + 1}`} alt={tour.name} />
        </div>
    ))

    return (
        <Fragment>
            {/* Tour Header */}
        <section className="section-header">
            <div className="header__hero">
            <div className="header__hero-overlay">&nbsp;</div>
            <img className="header__hero-img" src={`/img/tours/${tour.imageCover}`}  alt={tour.name}/>
            </div>
            <div className="heading-box">
                <h1 className="heading-primary">
    <span>{tour.name}</span>
                </h1>
                <div className="heading-box__group">
                    <div className="heading-box__detail">
                    <svg className="heading-box__icon">
                        <use xlinkHref={`${icons}#icon-clock`}></use>
                    </svg>
    <span className="heading-box__text">{tour.duration} days</span>
                    </div>
                    <div className="heading-box__detail">
                        <svg className="heading-box__icon">
                            <use xlinkHref={`${icons}#icon-map-pin`}></use>
                        </svg>
    <span className="heading-box__text">{tour.startLocation.description}</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Tour Description */}
        <section className="section-description">
            {/* overview details */}
        <div className="overview-box">
            <div>
                <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                    <use xlinkHref={`${icons}#icon-calendar`}></use>
                    </svg>
                    <span className="overview-box__label">Next Date</span>
                    <span className="overview-box__text">{formatDate(dates[1])} {dates[0]}</span>
                </div>

                <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                        <use xlinkHref={`${icons}#icon-trending-up`}></use>
                    </svg>
                    <span className="overview-box__label">Difficulty</span>
                    <span className="overview-box__text">{tour.difficulty}</span>
                </div>

                <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                        <use xlinkHref={`${icons}#icon-user`}></use>
                     </svg>
                    <span className="overview-box__label">Participants</span>
                    <span className="overview-box__text">{tour.maxGroupSize}</span>
                </div>

                <div className="overview-box__detail">
                <svg className="overview-box__icon">
                    <use xlinkHref={`${icons}#icon-star`}></use>
                </svg>
                <span className="overview-box__label">Rating</span>
                <span className="overview-box__text">{tour.ratingsAverage} / {tour.ratingsQuantity}</span>
                </div>
                </div>

                <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {
                tourGuides
            }
                </div>
            </div>
        </div>

        {/* overview description */}
        <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About {tour.name}</h2>
            <p className="description__text">
                {tour.description}
            </p>
        </div>
        </section>

        {/* section pictures */}
        <section className="section-pictures">
            {tourImages}
        </section>
        {/* section Map ? Component */}
        {
                <TourMap tour={tour} />
            }
        <section className="section-reviews">
            <div className="reviews"> 
                {
                    tour.reviews.map(review => (
                        <TourReview review={review} key={review._id} />
                    ))
                }
            </div>
            </section>
            {
                <TourBooking images={tour.images} />
            }
        </Fragment>
    )
}

export default TourView
