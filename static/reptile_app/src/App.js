import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home.js';

// Import the utlitity file and set baseURL to the data
import file from './utility.js';
const baseURL = file.data;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />        
      </div>
    );
  }
}

export default App;
