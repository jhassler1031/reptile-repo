import React, { Component } from 'react';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homeContainer container">
        <h1>Welcome to the Reptile Repo!</h1>
        <p>Reptiles can make great pets but it can be difficult to find certain resources
        in regards to their care.  Reptile Repo collects information on these various resources
        and puts it all here where it's easy to find.  We research vets that are
        reptile friendly, local pet stores that have reptile supplies, and information
        on different illnesses related to pet reptiles</p>
      </div>
    );
  }
}

export default Home;
