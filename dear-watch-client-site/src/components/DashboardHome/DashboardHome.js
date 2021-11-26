import React from 'react';
import './DashboardHome.css'
const DashboardHome = () => {
    return (
        <div className='dashboard-banner  d-flex justify-content-center align-items-center'>
            <div>
                <h1 className='text-info text-style text-center mb-3 fw-bold'>Dear Watch</h1>
                <p className='text-light text-style text-center'>One’s destination is never a place, but a new way of seeing things.</p>
                {/* <div className='d-flex justify-content-center align-items-center'>
                    <button type="button" class="btn btn-outline-dark px-3 mt-3"></button>
                </div> */}
            </div>
        </div>
    );
};

export default DashboardHome;