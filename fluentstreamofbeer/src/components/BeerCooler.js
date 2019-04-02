import React from 'react';
import { Table, Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import BeerCard from './BeerCard';
import AddBeer from './AddBeer';

class BeerCooler extends React.Component {

  //---------------- Functions ----------------



  // Take pulled data from DB and display 25 most recent beers
  updateBeerList() {
    {
      this.axiosGetData()
      .then(data => {
        this.setState({
          beerlist: data.data.slice(0, 25)
        })
      })
      .catch(err => console.log(err));
      console.log('Updating Beer Cooler')
    }
  }

  //pull data from DB
  axiosGetData = () => {
    return axios({
      url: "https://cors-anywhere.herokuapp.com/https://beer.fluentcloud.com/v1/beer/",
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
    .then(console.log(`Axios Call completed`));

  }

  // take selected beer details to add them to active state -> present on beer card
  selectedBeer = (beer) => {
    this.setState({
      activeBeer: true,
      activeID: beer.id,
      activeName: beer.name,
      activeLikes: beer.likes,
    })
    console.log('Row Clicked');
  }

  // Increasing and decreasing likes updates the state and DB
  increaseLikes = () => {
    this.setState({
      activeLikes: this.state.activeLikes + 1
    }, () => this.updateDBLikes())
    console.log("Increased Likes")
  }

  decreaseLikes = () => {
    this.setState({
      activeLikes: this.state.activeLikes - 1
    }, () => this.updateDBLikes())
    console.log("Decreased Likes")
  }

  updateDBLikes = () => {
    return axios({
      url: "https://cors-anywhere.herokuapp.com/https://beer.fluentcloud.com/v1/beer/" + this.state.activeID,
      method: "put",
      headers: { "Content-Type": "application/json" },
      data: { likes: this.state.activeLikes }
    })
    .then(this.axiosGetData())
    .then(this.updateBeerList())
    .then(console.log('Updated DB Likes'))
  }

  // Add a beer to DB via POST 
  AddBeer = (beer) => {
    this.setState({ newBeerName: document.getElementById("newestBeer").value }, () => {
      return axios({
        url: "https://cors-anywhere.herokuapp.com/https://beer.fluentcloud.com/v1/beer/",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          name: this.state.newBeerName,
          likes: 0,
        }
      })
      .then(this.axiosGetData())
      .then (this.updateBeerList())
    })
  }

  componentDidMount() {
    this.updateBeerList();
  }


  //---------------- State/Render ----------------
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      likes: null,
      activeBeer: false,
      activeID: null,
      activeName: null,
      activeLikes: null,
      beerlist: [],
      newBeerName: null
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="1" />
          <Col md="7">
            <div className='juliettesCooler'>
              <h2>Juliette's Beer Cooler</h2>
              <hr />
              <Table hover className='beerListTable'>
                <thead>
                  <tr>
                    <th>ID#</th>
                    <th>Beer Name</th>
                    <th>Likes</th>
                  </tr>
                </thead>
                <tbody >
                  {this.state.beerlist.map(beer => (
                    <tr key={beer.id} onClick={() => this.selectedBeer(beer)} >
                      <td scope="row" >{beer.id}</td>
                      <td>{beer.name}</td>
                      <td>{beer.likes}</td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            </div>
          </Col>
          <Col md="3">
            <BeerCard
              activeBeer={this.state.activeBeer}
              id={this.state.activeID}
              name={this.state.activeName}
              likes={this.state.activeLikes}
              beerSelect={this.selectedBeer}
              decreaseLikes={this.decreaseLikes}
              increaseLikes={this.increaseLikes}
            />
            <AddBeer submitBeer={this.AddBeer} />
          </Col>
        </Row >
      </Container >
    )
  }

}

export default BeerCooler;
