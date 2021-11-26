import React from 'react';
import { useForm } from "react-hook-form";
import './AddProducts.css'
const axios = require('axios');
const AddProducts = () => {
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        fetch("https://obscure-lowlands-73351.herokuapp.com/watch", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    alert('success')
                    reset();
                }
            });

    }
    return (
        <div>
            <div className='d-flex justify-content-center mt-5  '>
                <div className='shadow-lg p-5 bg-secondary'>
                    <h3>Please Add your products</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='input-style'  {...register("name")} placeholder='watch name' />
                        <br />
                        <input className='input-style' {...register("img")} placeholder='image link' />
                        <br />
                        <textarea className='input-style h-50' {...register("description")} placeholder='description' />
                        <br />
                        <input className='input-style' {...register("brand")} placeholder='brand' />
                        <br />
                        <input className='input-style' {...register("price")} placeholder='price' />
                        <br />
                        <input className='input-style' {...register("piece")} placeholder='available piece' />
                        <br />
                        <input className='input-style bg-info  border border-info' type="submit" />
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddProducts;