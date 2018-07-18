import React, { Component } from 'react';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homeContainer container">
        <h1>Wlecome to the Reptile Repo!</h1>
      </div>
    );
  }
}

export default Home;
