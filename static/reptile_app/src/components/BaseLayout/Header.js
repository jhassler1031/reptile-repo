import React, { Component } from 'react';
import $ from 'jquery';
import { NavLink } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loggedIn: (sessionStorage.getItem("token") !== null ? true : false)
    }

    this._handleInput = this._handleInput.bind(this);
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
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

  _login(event) {
    event.preventDefault()
    // Toggles the modal off after submit
    $('#loginModal').modal('toggle')
    this.setState({loggedIn: true});
    this.props.authenticate(this.state.username, this.state.password);
  }

  _logout(event) {
    event.preventDefault();
    this.setState({loggedIn: false});
    this.props.deauthenticate();
  }

  render() {
    return (
      <div className="container-fluid header">
        <div className="row align-items-center headerRow">
          <nav id="headerNAV" className="col-12 col-md-4 header-item">
            {/* NAV Links here */}
            <button className="navButton"><NavLink to='/'>Home</NavLink></button>
            <button className="navButton"><NavLink to='/vets'>Vets</NavLink></button>
            <button className="navButton"><NavLink to='/stores'>Local Pet Stores</NavLink></button>
            <button className="navButton"><NavLink to='/illnesses'>Illnesses</NavLink></button>
          </nav>

          <h1 className="col-12 col-md-4 header-item header-title">The Reptile Repo</h1>

          {this.state.loggedIn ?
          <div className="col-12 col-md-4 loginOutContainer header-item">
            <button type="button" className="loginOutButton btn btn-primary"  onClick={this._logout}>Logout</button>
          </div>
          :
          // Button to bring up login modal
          <div id="headerLogin" className="col-12 col-md-4 loginOutContainer header-item">
            <button type="button" className="loginOutButton btn btn-primary" data-toggle="modal" data-target="#loginModal">Contributor Login</button>
          </div>
          }

          {/* Login Modal */}
          <div id="loginModal" className="modal" tabIndex="-1" role="dialog" data-backdrop="false">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title">Contributor Login</h1>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this._login} className="loginForm">
                    <label htmlFor="usernameInput">Username</label>
                    <input name="username" type="text" className="form-control" id="usernameInput" placeholder="Username" value={this.state.username} onChange={this._handleInput} required/>

                    <label htmlFor="passwordInput">Password</label>
                    <input name="password" type="password" className="form-control" id="passwordInput" placeholder="Password" value={this.state.password} onChange={this._handleInput} required/>

                    <button type="submit" className="btn btn-primary submit-button">Login</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary close-button" data-dismiss="modal">Close</button>
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
