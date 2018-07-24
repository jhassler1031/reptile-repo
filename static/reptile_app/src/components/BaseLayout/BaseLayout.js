import React from 'react';

import Header from './Header.js';
import Footer from './Footer.js';

function BaseLayout(props) {
  return (
    <div className="baseLayout">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default BaseLayout;
