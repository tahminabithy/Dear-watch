import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import './Review.css'
const Review = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const onSubmit = data => {
        console.log(data);
        fetch('https://obscure-lowlands-73351.herokuapp.com/review', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

    }
    return (
        <div className='container'>
            <div className='row shadow-lg '>
                <h5 className='text-style text-center mt-4'>Thank You For Your Time !!!</h5>
                <div className='col-lg-6 p-5 '>
                    <img src="https://media.istockphoto.com/photos/confident-businessman-with-arms-crossed-picture-id1296271163?b=1&k=20&m=1296271163&s=170667a&w=0&h=0biYdz-Uh0eLVUXjsazII8e6GwYcnOQxg0qKs-_I2yg=" className='img-fluid' alt="" />
                </div>
                <div className='col-lg-6'>
                    <div className='d-flex justify-content-center align-items-center '>
                        <div className='p-5'>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input className='form-size py-2 mt-2' {...register("name")} placeholder='UserName' defaultValue={user?.displayName} />
                                <p className='text-style'><small>Why do you Like our product?</small></p>
                                <textarea className='form-size mt-2 description' {...register("description")} />
                                <br />
                                <p className='text-style'><small>Please give ratings</small></p>
                                <input className='form-size py-2 mt-2' {...register("rating", { min: 0, max: 5 })} placeholder='Rating' />
                                <br />
                                <input className='form-size border border-info rounded mt-2 py-1  bg-info ' type="submit" />
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
};

export default Review;