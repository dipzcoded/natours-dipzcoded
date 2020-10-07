import React from 'react'
import {useHistory} from 'react-router-dom'

const TourError = ({match, errDetails}) => {
const history = useHistory();
    const routeChange = (e) => {
        let path = "/";
        history.push(path)
    }

    return (
        <main className="main">
          
            <div className="error__title">
    <h2 className="heading-secondary heading-secondary--error">Uh oh! Something went wrong!</h2>
    <h2 className="error__emoji">😢 🤯</h2>
            </div>
            <div className="error__msg">
    {match ? <h4>{match.params.tourname.toUpperCase()} not found......</h4> : <h3>{errDetails}</h3> }
            </div>
            <button className="btn btn--green button-outline" onClick={routeChange}>Go Back</button>
           
        </main>
    )
}

export default TourError
