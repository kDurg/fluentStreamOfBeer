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

  axiosGetData = () => { //Not working
    axios({
      url: "https://beer.fluentcloud.com/v1/beer/",
      method: "get",
      dataType: 'jsonp',
      headers: { "Content-Type": "application/json" }
    })
      // .then(res => res.json())
      .then(data => {
        console.log(`Axios Call completed: ${data}`);
        console.log(this[0].name)
        { this.fillCooler(data) };
        { this.selectedBeer(data) };
      })
      .catch(err => console.log(err));
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

  selectedBeer = (data) => { //Take info from selected beer in beerCooler
    this.setState({
      activeBeer: true,
      activeID: null,
      activeName: null,
      activeLikes: null,
    })
    console.log('Row Clicked');
    // const beerNum = (this.state.id) - 1;
    // this.setState({
    //   id: data[beerNum].id,
    //   name: data[beerNum].name,
    //   likes: data[beerNum].likes
    // });
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

  AddBeer = (beer) => {
    console.log('Adding a new Beer');
  }

  componentDidMount() {
    { this.getData() }
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
                  <tr onClick={this.selectedBeer} >
                    <td scope="row" >{this.state.id}</td>
                    <td>{this.state.name}</td>
                    <td>{this.state.likes}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md="auto">
            <BeerCard
              activeBeer={this.state.activeBeer}
              id={this.state.id}
              name={this.state.name}
              likes={this.state.likes}
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
