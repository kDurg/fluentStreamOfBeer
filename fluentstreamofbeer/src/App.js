import React, { Component } from 'react';
import './App.css';
import BeerCard from './components/BeerCard';
import BeerCooler from './components/BeerCooler';
import axios from 'axios';
import { get } from 'http';

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
    this.state = {
      id: 1,
      name: null,
      likes: 1
    }
  }

  getData = () => { //Not working
    axios({
      url:"https://beer.fluentcloud.com/v1/beer/", 
      method: get,
      headers: {"Content-Type": "application/json"}
    })
      .then(res => {
        console.log(`Axios Call completed: ${res}`)
      });
  }

  increaseLikes = () =>{
    this.setState({
      likes: this.state.likes +1
    })
    console.log('increased likes');
  }

  decreaseLikes = () =>{
    this.setState({
      likes: this.state.likes -1
    })
    console.log('decreased likes');

  }

  componentDidMount() {
    // {this.getData()}
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let  targetUrl = 'https://beer.fluentcloud.com/v1/beer';
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(data => {
        const beer = data;
        const beerNum = (this.state.id)-1;
        this.setState({
          id: beer[beerNum].id,
          name: beer[beerNum].name,
          likes: beer[beerNum].likes
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>FluentStream (of BEER!)</h1>
        </header>
        <body>
          {/* <BeerCooler /> */}
          <BeerCard id={this.state.id} name={this.state.name} likes={this.state.likes} increaseLikes={this.increaseLikes} decreaseLikes={this.decreaseLikes}/>
        </body>
      </div>
    );
  }
}

export default App;
