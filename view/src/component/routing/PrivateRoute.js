import React from 'react'
import {connect} from 'react-redux'
import { Redirect,Route } from 'react-router-dom'

const PrivateRoute = ({auth : {isAuthenticated,isLoading}, component:Component, ...rest}) => {
    return (
        <Route {...rest} render={props => !isAuthenticated && !isLoading ? <Redirect to="/login" /> : (<Component {...props} />) } />
    )
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps,null)(PrivateRoute)
