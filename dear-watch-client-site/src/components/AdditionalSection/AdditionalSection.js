import React from 'react';
import './AdditionalSection.css'
const AdditionalSection = () => {
    return (
        <div className='container my-5 shadow-lg'>
            <div className='row g-3 p-4'>
                <div className='col-lg-6 col-12 py-2'>
                    <p className='about-us border-bottom border-danger'>About Us</p>
                    <h1 className='text-style mb-3'>A Unique watch that fits Your Style</h1>
                    <p>The new Lawson collection is already here! This quartz Lawson Franklin 38 model, designed with simplicity and elegance, is truly a cherry on the cake. Comes in different sizes and band colors, has a stainless steel back for a personalized engraving.</p>
                    <button type="button" class="btn btn-outline-dark px-3 mt-3 ">About Us</button>
                </div>
                <div className='col-lg-6 col-12'>
                    <img src='https://cdn.shopify.com/s/files/1/0564/2705/3216/files/img-1.jpg?v=1633497682' class="card-img-top img-size rounded-top rounded-circle" alt="..." />
                </div>
            </div>

        </div>
    );
};

export default AdditionalSection;