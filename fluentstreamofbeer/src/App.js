import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import BeerCard from './components/BeerCard';
import BeerCooler from './components/BeerCooler';
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
    this.state = {
      id: 1,
      name: null,
      likes: 1,
      beerlist: [],
    }
  }

  getData = () => { //Workaround to get data
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let targetUrl = 'https://beer.fluentcloud.com/v1/beer';
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(data => {
        { this.fillCooler(data) };
        { this.selectedBeer(data) };
      })
      .catch(err => console.log(err));
  }

  // axiosGetData = () => { //Not working
  //   axios({
  //     url: "https://beer.fluentcloud.com/v1/beer/",
  //     method: "get",
  //     dataType: 'jsonp',
  //     headers: { "Content-Type": "application/json" }
  //   })
  //     .then(res => {
  //       console.log(`Axios Call completed: ${res}`)
  //     });
  // }

  fillCooler = (data) => {
    for (var i = 0; i < data.length; i++) {
      console.log('Entry ' + [i] + ': ' + data[i].name);
      
    }
    // const allBeersArray = data.map((beer) => <li>{beer}</li>)
    // console.log(`fillCooler Beer: ${allBeersArray}`);
  }

  selectedBeer = (data) => {
    const beerNum = (this.state.id) - 1;
    this.setState({
      id: data[beerNum].id,
      name: data[beerNum].name,
      likes: data[beerNum].likes
    });
  }

  increaseLikes = () => {
    this.setState({
      likes: this.state.likes + 1
    });
    console.log('increased likes');
  }

  decreaseLikes = () => {
    this.setState({
      likes: this.state.likes - 1
    });
    console.log('decreased likes');
  }

  componentDidMount() {
    { this.getData() }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>FluentStream (of BEER!)</h1>
        </header>
        <body>
          <Container>
            <Row>
              <Col md="1" />
              <Col md="7">
                <BeerCooler name={this.state.beerlist.name} likes={this.state.beerlist.likes} />
              </Col>
              <Col md="auto">
                <BeerCard id={this.state.id} name={this.state.name} likes={this.state.likes} increaseLikes={this.increaseLikes} decreaseLikes={this.decreaseLikes} />
              </Col>
              <Col md="1" />
            </Row>
          </Container>
        </body>
      </div>
    );
  }
}

export default App;
