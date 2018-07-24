import React, { Component } from 'react';

import Header from './Header.js';
import Footer from './Footer.js';

// Import the utlitity file and set login URL
import file from '../../utility.js';
const loginURL = file.loginURL;

class BaseLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
    this._authenticate = this._authenticate.bind(this);
  }

  _authenticate(username, password) {
    let loginInfo = {
      username: username,
      password: password
    }

    fetch(loginURL, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': "application/json"
      }
    })
    .then(response=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(responseAsJson=> {
      // Set local session storage item to {token: "token auth_token"}
      // Using sessionStorage instead of localStorage because it will be deleted when the browser closes
      sessionStorage.setItem("token", "token " + responseAsJson.auth_token);
      // console.log(sessionStorage.getItem("token"));
      // Need to post the username/password to get an auth token and save to user's local storage
      this.setState({loggedIn: true});
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });

  }

  render() {
    return (
      <div className="baseLayout">
        <Header authenticate={this._authenticate}/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default BaseLayout;
