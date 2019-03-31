import React from 'react';
import { Table } from 'reactstrap';

const BeerCooler = props => {
    return (
        <>
            <h2>Juliette's Beer Cooler</h2>
            <Table hover>
                <thead>
                    <tr>
                        <th>ID#</th>
                        <th>Beer Name</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{props.id}</th>
                        <td>{props.name}</td>
                        <td>{props.likes}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default BeerCooler;
