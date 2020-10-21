import React from 'react'
import LoadGif from '../../img/spinner.gif'

const Loader = () => {
    return (
        <main className="main">
            <div className="card-container">
        <img src={LoadGif} alt="loader......" style={{
            gridColumn : '1 / -1',
            alignSelf : 'center',
            justifySelf : 'center',
            width : '150px'

        }} />
            </div>
            
        </main>
    )
}

export default Loader
