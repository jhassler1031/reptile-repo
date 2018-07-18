import React from 'react';

import Header from './Header.js';

function BaseLayout(props) {
  return (
    <div className="baseLayout">
      <Header />
      {props.children}
    </div>
  );
}

export default BaseLayout;
