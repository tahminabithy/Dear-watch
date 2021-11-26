import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import './Login.css'
import { Link } from 'react-router-dom';
import Menubar from '../Menubar/Menubar';
const Login = () => {
    const { user, loginUsingGoogle, error, login } = useAuth();
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const location = useLocation();
    const onSubmit = data => {
        console.log(data);
        login(data.email, data.password, location, history)
    }
    return (
        <div>
            <Menubar></Menubar>
            <div className='container mt-5 shadow-lg'>
                <div className="row g-4">
                    <div className="col-lg-6 col-12 p-3 rounded">
                        <img className='img-fluid' src="https://cdn.luxe.digital/media/2020/05/21140846/best-luxury-watch-brands-roger-dubuis-luxe-digital.jpg" alt="" />
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className='d-flex jusify-content-center align-items-center' >
                            <div className=' p-5 mb-5 bg-body rounded'>
                                <h3 className='brand-style'>Please Login</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <input className='form-size py-2 mt-2' {...register("email")} placeholder='email' />
                                    <br />
                                    <input className='form-size py-2 mt-2' {...register("password")} type='password' placeholder='password' />
                                    <br />
                                    <input className='form-size border border-info rounded mt-2 py-1  bg-info ' type="submit" />
                                </form>
                                <p className='text-danger'>{error}</p>
                                <button onClick={loginUsingGoogle} type="button" class="btn btn-outline-dark text-info"><i class="fab fa-google me-2"></i> Sign In with Google</button>
                                <Link to='/register' className='new-user'>
                                    <p ><small>New User?</small></p>
                                </Link>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;