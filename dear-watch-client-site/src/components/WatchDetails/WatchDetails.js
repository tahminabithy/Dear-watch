import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './WatchDetails.css'
import Menubar from '../Menubar/Menubar';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';

const WatchDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [details, setDetails] = useState();
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        data.status = "pending"
        console.log(data);
        fetch('https://obscure-lowlands-73351.herokuapp.com/order', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    // alert("Your Order Is Successfully Placed")
                    setSuccess(true)
                    reset();
                }
            })
    }

    useEffect(() => {
        fetch(`https://obscure-lowlands-73351.herokuapp.com/watches/${id}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                setDetails(data)
            })
    }, [])
    return (
        <div>
            <Menubar></Menubar>

            <div>
                <h3 className='text-style mt-5 text-center'>Our Best Collections</h3>
                <p className='text-center text-secondary'>The Dear Watch pick their favourite new and upcoming watches from big Swiss brands and under-the-radar newbies</p>
                <div className='row shadow-lg p-5 g-4 '>
                    <div className='col-lg-6 col-12 bg-dark  p-3 rounded shadow-lg'>
                        <h2 className='text-style mt-3 py-2'>{details?.name}</h2>
                        <h5 className=' brand-style mb-4 pt-3'>{details?.brand}</h5>
                        <p className='text-light'>{details?.description}</p>
                        <div>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                        </div>
                        <h5 className='mt-4 brand-style'>Available Stocks {details?.piece}</h5>
                        <h5 className='mt-4 brand-style'>Price <span className='text-style'> ${details?.price}</span></h5>
                        <button type="button" class="btn btn-outline-info mt-5 px-4 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Shop now
                        </button>

                        {/* modal */}
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-style" id="exampleModalLabel">{details?.name} Hand Watch</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body d-flex justify-content-center align-items-center">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <input className='input-style'  {...register("name")} placeholder='Username' defaultValue={user?.displayName} />
                                            <br />
                                            <input className='input-style' {...register("email")} placeholder='Email' defaultValue={user?.email} />
                                            <br />
                                            <input className='input-style' {...register("watchName")} placeholder='Watch name' />
                                            <br />
                                            <input defaultValue={new Date()} className='input-style' {...register("date")} placeholder='Date' />
                                            <br />
                                            <input className='input-style' {...register("address")} placeholder='Address' />
                                            <br />
                                            <input className='input-style' {...register("price")} placeholder='price' />
                                            <br />
                                            <input className='input-style bg-info  border border-info' type="submit" />
                                        </form>
                                    </div>
                                    {
                                        success && <div class="alert alert-success" role="alert">
                                            Your order successflly placed
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-lg-6 col-12   p-3 '>
                        <img src={details?.img} className='img-fluid' alt="" />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default WatchDetails;