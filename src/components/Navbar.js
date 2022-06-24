import React from 'react';
import {Link} from "react-scroll";
import nhl_logo from "../nhl-logo.png";

const Navbar = () => {
  return (
    <div id="navbar-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top"> 
            <div className="container">
                <a className="navbar-brand" href="https://www.nhl.com/"> <img className="nhl-logo" src={nhl_logo} alt="logo..."/>  </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link smooth={false} to="eastern" offset={-110} className="nav-link" href="#"> Eastern Conference <span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link smooth={false} to="western" offset={-110} className="nav-link" href="#"> Western Conference <span className="sr-only"></span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar