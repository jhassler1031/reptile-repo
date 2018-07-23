import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

function Header(props) {
  return (
    <div className="container-fluid">
    <div className="row align-items-center headerRow">
      <nav id="headerNAV" className="col-12 col-md-4 header-item">
        {/* NAV Links here */}
        <button className="navButton"><NavLink to='/'>Home</NavLink></button>
        <button className="navButton"><NavLink to='/vets'>Vets</NavLink></button>
        <button className="navButton"><NavLink to='/stores'>Local Pet Stores</NavLink></button>
        <button className="navButton"><NavLink to='/illnesses'>Illnesses</NavLink></button>
      </nav>

      <h1 className="col-12 col-md-4 header-item header-title">The Reptile Repo</h1>

      <div id="headerLogin" className="col-12 col-md-4 login header-item">
        <a href="#">Contributor Login</a>
      </div>
    </div>
    </div>
  );
}

export default Header;
