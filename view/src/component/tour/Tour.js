import React, {useEffect, Fragment} from 'react'
import TourView from './TourView'
import {connect} from 'react-redux';
import {getTour} from '../../actions/tours';

const Tour = ({match, getTour, tours : {tour}}) => {
   useEffect(() => {

        getTour(match.params.tourid);

   },[getTour,match])
    return (
        <Fragment>
            {/* TourView component */}
           {tour !== null && (
                <TourView tour={tour} />
           )}
        </Fragment>
    )
}


const mapStateToProps = state => ({
    tours : state.tours
})

export default connect(mapStateToProps, {getTour})(Tour)
