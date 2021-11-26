import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const MyOrder = () => {
    const { user } = useAuth();
    const [order, setOrder] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false)
    useEffect(() => {
        console.log(user.email);
        fetch(`https://obscure-lowlands-73351.herokuapp.com/orderinfo/${user?.email}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [user?.email]);

    const handleDelete = (id) => {
        fetch(`https://obscure-lowlands-73351.herokuapp.com/order/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                const warning = window.confirm("Do you want to cancel the booking?");

                if (warning) {
                    alert('booking successfully cancel')
                    const remainingOrder = order.filter(booking => booking._id !== id);
                    setOrder(remainingOrder)
                }
            })
    }

    return (
        <div>
            <div className='container'>
                <h1 className='text-center sec3-font my-3'>My Bookings</h1>
                <div className='table-responsive'>
                    <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Product</th>
                                <th scope="col">Date</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                                <th scope="col">Order</th>
                                <th scope="col">Action</th>




                            </tr>
                        </thead>
                        {
                            order?.map((booking, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{booking.name}</td>
                                        <td>{booking.email}</td>
                                        <td>{booking.watchName}</td>
                                        <td>{booking.date}</td>
                                        <td>{booking.address}</td>
                                        <td>{booking.status}</td>
                                        <td>
                                            <button onClick={() => handleDelete(booking._id)} type="button" class="btn btn-outline-success m-2">Cancel</button>
                                        </td>
                                        <td>{booking.payment ? "paid" : <Link to={`/dashboard/pay/${booking._id}`}>
                                            <button type="button" class="btn btn-outline-success m-2">pay</button>
                                        </Link>}</td>
                                    </tr>
                                </tbody>))
                        }



                    </table>

                </div>

            </div>
        </div>
    );
};

export default MyOrder;