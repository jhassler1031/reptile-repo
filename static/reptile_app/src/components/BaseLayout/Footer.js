import React, { Component } from 'react';
import $ from 'jquery';
import getCookie from '../../GetCookie.js';

import './Footer.css';

// Import the utlitity file and set baseURL to the data
import file from '../../utility.js';
const baseURL = file.baseURL;

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactName: '',
      contactEmail: '',
      contactPhone: undefined,
      messageText: '',
    }

    this._handleInput = this._handleInput.bind(this);
    this._submitMessage = this._submitMessage.bind(this);
  }

  _handleInput(event) {
    let content = event.target.value;
    if (event.target.name === "contactName") {
      this.setState({contactName: content});
    }
    if (event.target.name === "contactEmail") {
      this.setState({contactEmail: content});
    }
    if (event.target.name === "contactPhone") {
      this.setState({contactPhone: content});
    }
    if (event.target.name === "messageText") {
      this.setState({messageText: content});
    }
  }

  _submitMessage(event) {
    event.preventDefault();
    // Need to post to messages database
    $('#messageModal').modal('toggle')
    let url = `${baseURL}/messages/`;
    let csrftoken = getCookie('csrftoken');
    console.log("csrf:", csrftoken);
    let content = {
      contact_name: this.state.contactName,
      contact_email: this.state.contactEmail,
      contact_phone: this.state.contactPhone,
      message_text: this.state.messageText
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        'Content-Type': "application/json",
        // 'X-CSRFToken': csrftoken
      },
      credentials: "same-origin"
    })
    .then(response=>{
      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log(response);
    })
    .catch((error)=>{
      console.log("There was a problem: \n", error);
    });
  }

  render() {
    return (
      <div className="message-section">
        <h1>Contact Us</h1>
        <p>
          If there is any information you feel that we are missing on this site and would like us to
          add, or if you would like to be considered for becoming a contributor, please send us a message.  Thanks
        </p>

        <div id="message" className="footer-item">
          <button type="button" className="message-button btn btn-primary" data-toggle="modal" data-target="#messageModal">Send Us a Message</button>
        </div>

        <div className="modal" tabIndex="-1" role="dialog" id="messageModal" data-backdrop="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send us a message</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this._submitMessage} className="messageForm">
                  <label htmlFor="contactName">Name</label>
                  <input name="contactName" type="text" className="form-control" id="contactName" placeholder="Name" value={this.state.contactName} onChange={this._handleInput} required/>

                  <label htmlFor="contactEmail">Email Address</label>
                  <input name="contactEmail" type="text" className="form-control" id="contactEmail" placeholder="Email Address" value={this.state.contactEmail} onChange={this._handleInput} required/>

                  <label htmlFor="contactPhone">Phone Number (optional)</label>
                  <input name="contactPhone" type="text" className="form-control" id="contactPhone" placeholder="Phone Number" value={this.state.contactPhone} onChange={this._handleInput}/>

                  <label htmlFor="messageText">Message</label>
                  <textarea name="messageText" type="text" rows="5" className="form-control" id="messageText" placeholder="Your message here..." value={this.state.messageText} onChange={this._handleInput} required></textarea>

                  <button type="submit" className="btn btn-primary submit-button">Send</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary close-button" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
