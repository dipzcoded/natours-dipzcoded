import React, {Fragment} from 'react'
import LogoWhite from '../../img/logo-white.png';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logOut} from '../../actions/auth'
import User from '../../img/user.png'
import {withRouter} from 'react-router-dom';


const Navbar = ({auth : {isAuthenticated, isLoading, user}, logOut, history}) => {

  const authLinks = (
    <nav className="nav nav--user">
       <button onClick={() => logOut(history)} to="/login" className="nav__el">Log Out</button>
      {user && (
         <Link to="/user/account" className="nav__el">
         {user.photo ? (
           <img src={`/photo/${user.photo}`} alt={user.name} className="nav__user-img" />
         ) : <img src={User} alt={user.name} className="nav__user-img" /> } 
         <span>{user.name.split(' ')[0]}</span>
       </Link>
      )}
    </nav>
  );
  const guestLinks = (
    <nav className="nav nav--user">
         <Link to="/login" className="nav__el">Log in</Link>
        <Link to="/register" className="nav__el nav__el--cta">Sign up</Link>
     </nav>
  );


    return (
             <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">All tours</Link>
        {/* {
          showNavbar === true && (
            <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref={`${icons}#icon-search`}></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
          )
        } */}
      </nav>
      <div className="header__logo">
        <img src={LogoWhite} alt="Natours logo" />
      </div>
      
      { !isLoading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
    
    </header>
    )
}

const mapStateToProps = (state) => ({
  auth : state.auth
})

export default connect(mapStateToProps,{logOut})(withRouter(Navbar))
