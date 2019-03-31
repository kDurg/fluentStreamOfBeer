import React from 'react';
import App from '../App';

// put all API calls here

export default {
    getData: function(){ //Workaround to get data
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        let targetUrl = 'https://beer.fluentcloud.com/v1/beer';
        fetch(proxyUrl + targetUrl)
          .then(res => res.json())
          .then(data => {
            // { App.fillCooler(data) };
            // { this.selectedBeer(data) };
          })
          .catch(err => console.log(err));
      },
    
    
}
