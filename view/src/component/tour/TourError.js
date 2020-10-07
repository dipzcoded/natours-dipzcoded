import React from 'react'
import {useHistory} from 'react-router-dom'

const TourError = () => {
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
    <h4>The link you followed may be broken, or the page may have been removed.</h4>
            </div>
            <button className="btn btn--green button-outline" onClick={routeChange}>Go Back</button>
           
        </main>
    )
}

export default TourError
