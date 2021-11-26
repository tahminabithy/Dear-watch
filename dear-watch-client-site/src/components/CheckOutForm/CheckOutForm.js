import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
const CheckOutForm = ({ pay }) => {
    const [clientSecret, setClientSecret] = useState('')
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [proccessing, setProcessing] = useState(false);
    const { price, name, email, _id } = pay;
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch('https://obscure-lowlands-73351.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [price])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
            setSuccess('');
            console.log(error);
        }
        else {
            setError('');
            console.log(paymentMethod);
        }

        //intent

        const { paymentIntent, intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message);
            setSuccess('')
        }
        else {
            setError('');
            setSuccess('payment succesfully processed')
            setProcessing(false);
            console.log(paymentIntent);
            //save to db
            const payment = {
                amount: paymentIntent.amount,
                clientSecret: paymentIntent.client_secret.slice('_secret')[0],
                created: paymentIntent.created,
                last4: paymentMethod.card.last4
            }
            const url = `https://obscure-lowlands-73351.herokuapp.com/order/payment/${_id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => console.log(data));
        }

    };
    return (
        <div className='container'>
            <div>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />

                    {
                        proccessing ? <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div> : <button className='btn btn-outline-success mt-5' type="submit" disabled={!stripe || success}>
                            Pay ${price}
                        </button>
                    }
                </form>
                {
                    error && <p className='text-danger'>{error}</p>
                }
                {
                    success && <p className='text-success'>{success}</p>
                }

            </div>
        </div>

    );
};

export default CheckOutForm;