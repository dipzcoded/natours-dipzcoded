import React from 'react'
import icons from '../../img/icons.svg'
import {Link} from 'react-router-dom'

const ToursItem = ({tour}) => {


   const dates = tour.startDates[0].split('-')
    // formating the data
    const formatDate = (datesting) =>
    {
        const dateFormat = datesting;
            switch(dateFormat)
            {
                case "01" : return "January"
                case "02" : return "February"
                case "03" : return  "March"
                case "04" : return  "April"
                case "05" : return  "May"
                case "06" : return  "June"
                case "07" : return  "July"
                case "08" : return  "August"
                case "09" : return  "September"
                case "10" : return  "October"
                case "11" : return  "November"
                case "12" : return  "December"
                default : return "....."
            }
    }

    
    return (
        <div className="card">
            {/* card-header */}
            <div className="card__header">
                <div className="card__picture">
                   <div className="card__picture-overlay">&nbsp;</div> 
                   <img src={`img/tours/${tour.imageCover}`} alt={tour.name} className="card__picture-img" />
                </div>

                <h3 className="heading-tertirary"> <span>{tour.name}</span>
                </h3>
            </div>

            {/* card-details */}
            <div className="card__details">
        <h4 className="card__sub-heading">{tour.difficulty} {tour.duration}-day tour</h4>
        <p className="card__text">
            {tour.summary}
        </p>
        <div className="card__data">
           <svg className="card__icon">
               <use xlinkHref={ `${icons}#icon-map-pin`}></use>
               </svg> 
    <span>{tour.startLocation.description}</span>
        </div>
        <div className="card__data">
        <svg className="card__icon">
               <use xlinkHref={ `${icons}#icon-calender`}></use>
               </svg> 
    <span>  {formatDate(dates[1])} {dates[0]}</span>
        </div>
        <div className="card__data">
        <svg className="card__icon">
               <use xlinkHref={ `${icons}#icon-flag`}></use>
               </svg> 
    <span>{tour.locations.length} stops</span>
        </div>
        <div className="card__data">
        <svg className="card__icon">
               <use xlinkHref={ `${icons}#icon-user`}></use>
               </svg> 
    <span>{tour.maxGroupSize} people</span>
        </div>
            </div>

            {/* card footers */}
            <div className="card__footer">
                <p>
    <span className="card__footer-value">${tour.price} </span>
    <span className="card__footer-text">per person</span>
                </p>
                <p className="card__ratings">
    <span className="card__footer-value">{tour.ratingsAverage} </span>
    <span className="card__footer-text">rating ({tour.ratingsQuantity})</span>
                </p>
                <Link to={`/tours/${tour.slug}`} className="btn btn--green btn--small">Details</Link>
            </div>
        </div>
    )
}

export default ToursItem
