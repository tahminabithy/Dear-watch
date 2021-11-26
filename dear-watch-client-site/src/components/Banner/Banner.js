import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'
const Banner = () => {
    return (
        <div className='home-banner d-flex justify-content-center align-items-center'>
            <div>
                <h1 className=' text-style text-center mb-3 fw-bold'>We Value Your Fashion</h1>
                <p className='text-light text-style text-center'>Time is very precious you can't hold but you can change it.</p>
                <div className='d-flex justify-content-center align-items-center'>
                    <Link to='/allwatches'>
                        <button type="button" class="btn btn-outline-info px-3 mt-3">Explore More</button>
                    </Link>

                </div>


            </div>
        </div>
    );
};

export default Banner;