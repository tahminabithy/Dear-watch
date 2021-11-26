import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Menubar from '../Menubar/Menubar';

const Register = () => {
    const { user, registerUser, error } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
        registerUser(data.email, data.password, data.displayName, location, history)
    }
    return (
        <div>
            <Menubar></Menubar>
            <div className="container mt-5 shadow-lg">
                <div className="row">
                    <div className="col-lg-6 col-12 d-flex jusify-content-center align-items-center rounded">
                        <img className='img-fluid' src="https://cdn.wedevs.com/uploads/2018/12/User-Registration-WordPress-blog-feature-image.png" alt="" />
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className='d-flex jusify-content-center align-items-center' >
                            <div className=' p-5 mb-5 bg-body rounded'>
                                <h3>plaese Register</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input className='form-size py-2 mt-5' {...register("displayName")} placeholder='UserName' />
                                    <br />
                                    <input className='form-size py-2 mt-3' {...register("email")} placeholder='email' />
                                    <br />
                                    <input className='form-size py-2 mt-2' {...register("password")} type='password' placeholder='password' />
                                    <br />
                                    <input className='form-size border border-info rounded mt-2 py-1  bg-info ' type="submit" />
                                    <p>{error}</p>
                                </form>
                                <Link to='/login' className='new-user'>
                                    <p><small>Already Register? Please Log In First</small></p>
                                </Link>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Register;