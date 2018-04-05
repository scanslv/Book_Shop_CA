import React from 'react';

export function getRating(comments) {
    let ratingTotal = 0;

    comments.map((comment) => {
        ratingTotal = ratingTotal + parseInt(comment.rating);
    });

    let rating = 0;
    if (ratingTotal > 0)
        rating = Math.trunc(ratingTotal / comments.length);

    return <span>
    {getStars(rating).map((star) => {
        return star
    })}
</span>
}

function getStars(rating) {
    let emptyStars = 5;
    const uniqid = require('uniqid');


    if (rating > 0)
        emptyStars = emptyStars - rating;
    let stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push(<span key={uniqid()}>&#9733;</span>)
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={uniqid()}>&#9734;</span>)
    }

    return stars;
}