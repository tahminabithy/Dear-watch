import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';

const stripePromise = loadStripe('pk_test_51JxknkD1LUzlE13ArzhpLd5azm6ImkjVi1jamsKt9GVYUFAYgzslH9NuXf0pTv98gW9M6ToBIssXmiVJueyKqNBQ00mOorZ70U')
const Payment = () => {

    const { id } = useParams();
    const [pay, setPay] = useState({});
    useEffect(() => {
        fetch(`https://obscure-lowlands-73351.herokuapp.com/orders/${id}`)
            .then(res => res.json())
            .then(data => setPay(data))
    }, [])

    return (
        <div>
            <h3 className=' d-flex justify-content-center align-item-center'> Payment system coming soon {pay.price}</h3>
            {
                pay?.price && <Elements stripe={stripePromise}>
                    <CheckOutForm
                        pay={pay}></CheckOutForm>
                </Elements>
            }

        </div>
    );
};

export default Payment;