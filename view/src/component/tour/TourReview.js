import React from 'react'
import icons from '../../img/icons.svg';

const TourReview = ({review}) => {

    const ratinglength = Array.from({length : review.rating});
    console.log(ratinglength)

    return (
        <div className="reviews__card">
            <div className="reviews__avatar">
        <img src={`/img/users/${review.user.photo}`} alt={review.user.name} className="reviews__avatar-img" />
        <h6 className="reviews__user">{review.user.name}</h6>
        </div> 

        <p className="reviews__text">
        {review.review}
        </p>
        <div className="reviews__rating">
        {
                ratinglength.map((index) => (
                    <svg class="reviews__star reviews__star--active" key={index}>
                    <use xlinkHref={`${icons}#icon-star`}></use>
                  </svg>
                ))
            }
        </div>
        </div>
    )
}

export default TourReview
