import React, { Component } from 'react';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

import './Header.css';

// Import the utlitity file and set login/logout URLs
import file from '../../utility.js';
const loginURL = file.loginURL;
const logoutURL = file.logoutURL

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      username: '',
      password: ''
    }

    this._handleInput = this._handleInput.bind(this);
    this._login = this._login.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "username") {
      this.setState({username: content});
    }
    if (event.target.name === "password") {
      this.setState({password: content});
    }
  }

  _login() {
    // Toggles the modal off after submit
    $('#loginModal').modal('toggle')

    let loginInfo = {
      username: this.state.username,
      password: this.state.password
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
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });

    // Need to post the username/password to get an auth token and save to user's local storage
    this.setState({loggedIn: true});
  }

  render() {
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
            <button type="button" className="loginButton btn btn-primary" data-toggle="modal" data-target="#loginModal">Contributor Login</button>
          </div>
          {/* <div id="headerLogin" className="col-12 col-md-4 login header-item">
            <a href="#">Contributor Login</a>
          </div> */}
          <div className="modal" tabindex="-1" role="dialog" id="loginModal" data-backdrop="false">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Contributor Login</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={(event)=>{event.preventDefault(),this._login()}} className="loginForm">
                    <label htmlFor="usernameInput">Username</label>
                    <input name="username" type="text" className="form-control" id="usernameInput" placeholder="Username" value={this.state.username} onChange={this._handleInput} required/>

                    <label htmlFor="passwordInput">Password</label>
                    <input name="password" type="password" className="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this._handleInput} required/>

                    <button type="submit" className="btn btn-primary">Login</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
