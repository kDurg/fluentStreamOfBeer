import React from 'react';

const BeerCooler = props => {
    return (
        <>
            <h2>Juliette's Beer Cooler</h2>
            <hr />
            <ul>
                <li>{props.name}</li>
            </ul>
        </>
    )
}

export default BeerCooler;