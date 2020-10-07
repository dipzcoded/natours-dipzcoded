import React, {useEffect, Fragment} from 'react'
import TourView from './TourView'
import {connect} from 'react-redux';
import {getTour, getAllTours} from '../../actions/tours';
import {Redirect} from 'react-router-dom'

const Tour = ({match, history, getTour, getAllTours, tours : {tour, tours, isLoading, error}}) => {

    const redirectChange  = () =>{
       return <Redirect to={`/${match.params.tourname}/notfound`} />
    }

   useEffect(() => {
       getAllTours();
        
            const tourData = tours.find((tour) => {
                if(tour.slug === match.params.tourname && tour._id === match.params.tourid)
                {
                    return tour;
                }
            })
            if(tourData)
            {
                getTour(match.params.tourid);
            }else
            {
                redirectChange()
            }
        
   },[])


    return (
        <Fragment>
            {tour && <TourView tour={tour} />}
        </Fragment>
    )   
}


const mapStateToProps = state => ({
    tours : state.tours
})

export default connect(mapStateToProps, {getTour, getAllTours})(Tour)
