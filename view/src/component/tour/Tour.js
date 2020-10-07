import React, {useEffect, Fragment, useState} from 'react'
import TourView from './TourView'
import {connect} from 'react-redux';
import {getTour} from '../../actions/tours';
import {Redirect} from 'react-router-dom'

const Tour = ({match, getTour, tours : {tour, error}}) => {

   useEffect(() => {

        getTour(match.params.tourid)
        
   },[])
   

   if(error )
   {
       return <Redirect to="/tour/notfound" />
   }
   



    return (
   <Fragment>
       {/* {!isLoading && (tourAv === false && !tour  ? <TourError /> : <TourView tour={tour} />)} */}
       {tour !== null && <TourView  tour={tour}  />}
   </Fragment>
    )
          
}


const mapStateToProps = state => ({
    tours : state.tours
})

export default connect(mapStateToProps, {getTour})(Tour)
