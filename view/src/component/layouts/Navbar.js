import React from 'react'
import icons from '../../img/icons.svg'
import LogoWhite from '../../img/logo-white.png';

const Navbar = () => {
    return (
             <header className="header">
      <nav className="nav nav--tours">
        <a href="#" className="nav__el">All tours</a>
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
      </nav>
      <div className="header__logo">
        <img src={LogoWhite} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
         <button className="nav__el">Log in</button>
        <button className="nav__el nav__el--cta">Sign up</button>
      </nav>
    </header>
    )
}

export default Navbar
