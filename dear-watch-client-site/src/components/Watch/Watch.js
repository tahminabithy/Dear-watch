import React from 'react';
import { Link } from 'react-router-dom';
import './Watch.css'
const Watch = ({ watch }) => {
    const { name, img, brand, _id, price, piece, description } = watch
    return (
        <div class="col watch-style">
            <div class="card h-100 bg-dark shadow-lg  ">
                <img src={img} class="card-img-top img-size" alt="..." />
                <div class="card-body ">
                    <h3 class="card-title text-style">{name}</h3>
                    <h5 className='brand-style'>{brand}</h5>
                    {/* <p class="card-text text-light"><small>{description}</small></p> */}
                    <h5 class="card-title brand-style">Available Stocks <span className='text-style'>{piece}</span> </h5>
                    <h5 class="card-title text-style">${price} </h5>

                </div>
                <div class="card-footer">
                    <Link to={`/watchDetail/${_id}`}>
                        <button type="button" class="btn btn-outline-info ">More Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Watch;