import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import './ShowReview.css'
const ShowReview = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://obscure-lowlands-73351.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div className='container my-5 '>
            <h4 className='text-center text-style '>Review</h4>
            <p className='text-center text-secondary mb-5'><small>Our Happy Client Says</small> </p>
            <div className='row g-4  rounded'>
                {
                    reviews.map(review => <div className='col-lg-4 col-12 shadow-lg  rounded review-color'>
                        <div >
                            <h4 className='text-secondary  border-bottom border-secondary py-3'>Client Experince</h4>
                            <h5 className='review-name  my-3'>{review.name}</h5>
                            <p>" {review.description} "</p>
                            <Rating
                                className='text-warning mb-3'
                                initialRating={review.rating}
                                emptySymbol="far fa-star"
                                fullSymbol="fas fa-star"
                                readonly
                            />
                        </div>

                    </div>)
                }

            </div>
        </div>
    );
};

export default ShowReview;