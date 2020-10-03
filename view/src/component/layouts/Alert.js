import React from 'react'
import {connect} from 'react-redux';

const Alert = ({alert}) => {

   return  alert !== null && alert.length > 0 && alert.map((el) => (
    <div className={`alert alert--${el.alertType}`} key={el.id}>
        <p>{el.msg}</p>
    </div>
))

}

const mapStateToProps = state => ({
    alert : state.alert
});


export default connect(mapStateToProps,{})(Alert)
