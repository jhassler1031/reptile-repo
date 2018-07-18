import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

function Header(props) {
  return (
    <div className="row headerRow">
      <nav className="col headerNAV">
        {/* NAV Links here */}
        <button><NavLink to='/'>Home</NavLink></button>
        <button><NavLink to='/vets'>Vets</NavLink></button>
        <button><NavLink to='/stores'>Local Pet Stores</NavLink></button>
        <button><NavLink to='/illnesses'>Illnesses</NavLink></button>
      </nav>

      <div className="login">

      </div>
    </div>
  );
}

export default Header;
