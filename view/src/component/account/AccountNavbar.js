import React from 'react'
import {connect} from 'react-redux';
import icons from '../../img/icons.svg'

const AccountNavbar = ({auth : {user}}) => {


        const adminNav = (
            <div className="admin-nav">
                <h5 className="admin-nav__heading">Admin</h5>
                <ul className="side-nav">

                <li> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-map`}></use>
            </svg>
            | Manage tours
        </a>
        </li>

        <li> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-users`}></use>
            </svg>
            | Manage users
        </a>
        </li>

        <li> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-star`}></use>
            </svg>
            | Manage reviews
        </a>
        </li>

        <li> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-briefcase`}></use>
            </svg>
            | Manage bookings
        </a>
        </li>

                </ul>
            </div>
        )


    return (
        
            <nav className="user-view__menu">
        <ul className="side-nav">

        <li className="side-nav--active"> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-settings`}></use>
            </svg>
            | settings
        </a>
        </li>

        <li> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-briefcase`}></use>
            </svg>
            | My bookings
        </a>
        </li>

        <li> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-star`}></use>
            </svg>
            | My reviews
        </a>
        </li>

        <li> 
        <a href="!#">
            <svg>
        <use xlinkHref={`${icons}#icon-credit-card`}></use>
            </svg>
            | Billings
        </a>
        </li>
        </ul>
        {/* show the adminNav only when the role is an admin Role */}
        {user && user.role === "admin" && adminNav}
            </nav>
    )
}

const mapStateToProps = state => ({

    auth : state.auth
})

export default connect(mapStateToProps,null)(AccountNavbar)
