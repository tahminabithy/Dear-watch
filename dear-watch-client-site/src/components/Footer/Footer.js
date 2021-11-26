import React from 'react';

const Footer = () => {
    return (
        <div className='mt-5 pt-4'>
            <div className='row'>
                <div className='col-lg-4 col-12'>
                    <div className='d-flex justify-content-center align-items-center' >
                        <div>
                            <p className='fw-bold'>LOCATIONS</p>
                            <p><small>Location1</small></p>
                            <p><small>90/2, Mohakhali, Gulshan</small></p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='d-flex justify-content-center align-items-center' >
                        <div>
                            <p className='fw-bold'>FOLLOW US</p>
                            <p><span><i class="fab fa-facebook text-primary me-3"></i><i class="fab fa-youtube text-danger me-3"></i><i class="fab fa-instagram text-primary"></i></span> </p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-12'>
                    <div className='d-flex justify-content-center align-items-center' >
                        <div>
                            <p className='fw-bold'>CONTACT</p>
                            <p>Phone : 03726789382</p>
                            <p><small>Email : dearWatch@gmail.com</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;