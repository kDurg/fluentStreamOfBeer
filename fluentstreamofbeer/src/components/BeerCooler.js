import React from 'react';
import { Table, Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import BeerCard from './BeerCard';
import API from './API'

class BeerCooler extends React.Component {
  
  //---------------- Functions ----------------
  getData = () => { //Workaround to get data
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let targetUrl = 'https://beer.fluentcloud.com/v1/beer';
    fetch(proxyUrl + targetUrl)
      .then(res => res.json())
      .then(data => {
        { this.fillCooler(data) };
        // { this.selectedBeer(data) };
      })
      .catch(err => console.log(err));
  }

  axiosGetData = () => {
    return axios({
      url: "https://cors-anywhere.herokuapp.com/https://beer.fluentcloud.com/v1/beer/",
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
  }

  fillCooler = (data) => {
    this.setState({
      id: data[0].id,
      name: data[0].name,
      likes: data[0].likes
    })
    for (var i = 0; i < data.length; i++) {

      console.log('Entry ' + [i] + ': ' + data[i].name);
      // return (
      //   <>
      //     <tr>
      //       <th scope="row">{data[i].id}</th>
      //       <td>{data[i].name}</td>
      //       <td>{data[i].likes}</td>
      //     </tr>
      //   </>
      // )

    }
    // const allBeersArray = data.map((beer) => <li>{beer}</li>)
    // console.log(`fillCooler Beer: ${allBeersArray}`);
  }

  selectedBeer = (beer) => { //Take info from selected beer in beerCooler
    this.setState({
      activeBeer: true,
      activeID: beer.id,
      activeName: beer.name,
      activeLikes: beer.likes,
    })
    console.log('Row Clicked');
  }

  increaseLikes = () => {
    this.setState({
      activeLikes: this.state.activeLikes + 1
    });
    console.log('increased likes');
  }

  decreaseLikes = () => {
    this.setState({
      activeLikes: this.state.activeLikes - 1
    });
    console.log('decreased likes');
  }

  // updateDBLikes = () => {
  //   return axios({
  //     url: "https://cors-anywhere.herokuapp.com/https://beer.fluentcloud.com/v1/beer/",
  //     method: "put",
  //     headers: { "Content-Type": "application/json" }
  //   })
  // }

  AddBeer = (beer) => {
    console.log('Adding a new Beer');
  }

  componentDidMount() {
    { this.axiosGetData()
      .then(data => {
        console.log(`Axios Call completed: ${data}`);
        console.log(data.data)
        // { this.fillCooler(data) };
        // { this.selectedBeer(data) };
        this.setState({
          beerlist: data.data.slice(0,25)
        })
      })
      .catch(err => console.log(err)); }
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
                  <tr className="addBeerRow" onClick={this.AddBeer}>
                    <td scope="row" ></td>
                    <td id='newBeerTextBox'><b>Click Here To Add A Beer</b></td>
                    <td />
                  </tr>
                  
                  {this.state.beerlist.map(beer => (
                    <tr onClick={()=> this.selectedBeer(beer)} >
                    <td scope="row" >{beer.id}</td>
                    <td>{beer.name}</td>
                    <td>{beer.likes}</td>
                  </tr>
                  ))}

                </tbody>
              </Table>
            </div>
          </Col>
          <Col md="auto">
            <BeerCard
              activeBeer={this.state.activeBeer}
              id={this.state.activeID}
              name={this.state.activeName}
              likes={this.state.activeLikes}
              AddBeer={this.AddBeer}
              beerSelect={this.selectedBeer}
              decreaseLikes={this.decreaseLikes}
              increaseLikes={this.increaseLikes}
            />
          </Col>
        </Row >
      </Container >
    )
  }

}

export default BeerCooler;
