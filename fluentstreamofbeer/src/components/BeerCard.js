import React from 'react';

const Beerlist = props => {
    return (
        <ul className= "list-group">
            <h4>ID: {props.id} | Name: {props.name}</h4>
            <h5>Likes: {props.likes}</h5>
            {/* {props.results.map(result => {
                <li className="list-group-item" key={result.id}>
                    <h3>{result.name} </h3><h4>Likes: {result.likes}</h4>
                </li>
            })}         */}
        </ul>
    )
}

export default Beerlist;