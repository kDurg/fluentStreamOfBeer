import React, { Component } from 'react';
import './App.css';
import BeerCard from './components/BeerCard';

//Program Overview:
  // Create a program that uses GET, POST and PUT with a defined database. 
  // Display information about the beer and allow users to add likes to the beers

  //Functionality:
    // On program load: GET
      // Start with Dummy data until Axios call finishes
        // update state criteria where ID:1
        // pass props to BeerCard.js to display results
      
      // Allow user to input an ID number:
        // on click event, search DB for ID number: GET 
          // if available - SetState with new data
          // if not available - return message, ask if they would like to input new beer
            // open up modal with autofilled ID (last ID++), text box for name and starting likes
        // allow user to add a like to beer: PUT
          // update local state and PUT to DB

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: null,
      likes: 1
    }
  }

  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let  targetUrl = 'https://beer.fluentcloud.com/v1/beer';

    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(data => {
        const beers = data;
        const beerNum = (this.state.id)-1;
        this.setState({
          id: beers[beerNum].id,
          name: beers[beerNum].name,
          likes: beers[beerNum].likes
        });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>FluentStream (of BEER!)</h1>
        </header>
        <body>
          <h2>Current Beers: </h2>
          <BeerCard id={this.state.id} name={this.state.name} likes={this.state.likes}/>
        </body>
      </div>
    );
  }
}

export default App;
