import React from 'react';

const BeerCard = props => {
    return (
        <ul className= "list-group">
            <h2>{props.name}</h2> 
            <h6>ID# {props.id}</h6>
            <h3>{props.likes} People Like This Beer</h3>
            <button onClick = {props.increaseLikes} type="button" className="likeBtn btn btn-default btn-sm">
                <span className="glyphicon glyphicon-thumbs-up"></span>  Like
            </button>
            <button onClick = {props.decreaseLikes} type="button" className="dislikeBtn btn btn-default btn-sm">
                <span className="glyphicon glyphicon-thumbs-down"></span>  Dislike
            </button>
        </ul>
    )
}

export default BeerCard;