import React from 'react';

const BeerCard = props => {
    if (props.activeBeer) {
        return (
            <ul className="list-group">
                <div className='beerCardDiv'>
                    <hr></hr>
                    <h2>{props.name}</h2>
                    <h6>ID# {props.id}</h6>
                    <h3>{props.likes} People Like This Beer</h3>
                    <button onClick={props.increaseLikes} type="button" className="likeBtn btn btn-default btn-sm">
                        <span className="glyphicon glyphicon-thumbs-up"></span>  Like
                    </button>
                    <button onClick={props.decreaseLikes} type="button" className="dislikeBtn btn btn-default btn-sm">
                        <span className="glyphicon glyphicon-thumbs-down"></span>  Dislike
                    </button>
                    <hr></hr>
                </div>
            </ul>
        )
    } else {
        return (
            <>
                <p>Select a Beer for Details</p>
                <p>Or click here to add a new beer</p>
            </>
        )
    }
}

export default BeerCard;