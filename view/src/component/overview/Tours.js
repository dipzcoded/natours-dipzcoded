import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {getAllTours} from '../../actions/tours';
import ToursItem from './ToursItem'
import {Helmet} from 'react-helmet'

const Tours = ({tours : {tours},getAllTours}) => {

    useEffect(() => {
        getAllTours();
    },[getAllTours])


    // creating the touritem card
    const tourItemCard = tours.map((tour) => (
        <ToursItem tour={tour} key={tour._id} />
    ))

    return (
        <main className="main">
            <Helmet>
    <title>Natours | Natours | Exciting tours for adventurous people</title>
            </Helmet>
            <div className="card-container">
                {/* tour items */}
                {tourItemCard}
            </div>
        </main>
    )
}

const mapsStateToProps = state =>({
    tours : state.tours
})

export default connect(mapsStateToProps, {getAllTours})(Tours)
