import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import BeerCooler from './components/BeerCooler';
import Footer from './components/Footer';
import axios from 'axios';

//Program Overview:
// Create a program that uses GET, POST and PUT with a defined database. 
// Display information about the beer and allow users to add likes to the beers

//Functionality:
// On program load Start Fetch call: GET
// update state based on first object in returned array
// pass props to BeerCard.js to display results

// Let user search for a beer using the ID
// on click event, search DB for ID number 
// if available - SetState with new data
// if not available - return message, ask if they would like to input new beer

// Let user input New Beer: PUSH
// On Button Click, open up modal with autofilled ID (last ID++), text box for name and starting likes

// Update Beer Likes: PUT
// allow user to add a like to beer
// update local state and DB

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>FluentStream (of BEER!)</h1>
        </header>
        <body>
          <BeerCooler/>
        </body>
        <footer>
          {/* <Footer /> */}
        </footer>
      </div>
    );
  }
}

export default App;
