import React from 'react';
import { useForm } from 'react-hook-form';

const MakeAdmin = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
        fetch('https://obscure-lowlands-73351.herokuapp.com/user', {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

    }
    return (
        <div className='d-flex justify-content-center align-items-center '>
            <div className='my-5'>
                <h3>Please Add an Admin</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='form-size py-2 mt-2' {...register("email")} placeholder='email' />
                    <br />
                    <input className='form-size border border-info rounded mt-2 py-1  bg-info ' type="submit" />
                </form>
            </div>

        </div>
    );
};

export default MakeAdmin;