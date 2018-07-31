import React, { Component } from 'react';

import './Signup.css';

// Import the utlitity file and set base URL
import file from '../../utility.js';
const baseURL = file.baseURL;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: ''
    }

    this._userSignUp = this._userSignUp.bind(this);
    this._handleInput = this._handleInput.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "email") {
      this.setState({email: content});
    }
    if (event.target.name === "username") {
      this.setState({username: content});
    }
    if (event.target.name === "password") {
      this.setState({password: content});
    }
  }

  _userSignUp(event) {
    event.preventDefault();
    let url = `${baseURL}/auth/users/create`;
    let userInfo = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(userInfo),
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
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    return (
      <div className="row justify-content-center signup">
        <h1 className="col-12 signup-headline">Welcome!  Please fill out to create your contributor user account</h1>
        <form onSubmit={this._userSignUp} className="loginForm col-12 col-sm-10 col-md-8 col-xl-6">
          <label htmlFor="emailInput">Email</label>
          <input name="email" type="text" className="form-control" id="emailInput" placeholder="Email" value={this.state.email} onChange={this._handleInput} />

          <label htmlFor="usernameInput">Username</label>
          <input name="username" type="text" className="form-control" id="usernameInput" placeholder="Username" value={this.state.username} onChange={this._handleInput} required/>

          <label htmlFor="passwordInput">Password</label>
          <input name="password" type="password" className="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this._handleInput} required/>

          <div className="row justify-content-center">
            <button type="submit" className="col-8 col-sm-6 col-md-4 btn btn-primary submit-button">Create User Account</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
