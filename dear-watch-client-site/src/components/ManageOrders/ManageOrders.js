import React, { useEffect, useState } from 'react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false)
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        fetch('https://obscure-lowlands-73351.herokuapp.com/order', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [isUpdate])

    const handleDelete = (id) => {
        fetch(`https://obscure-lowlands-73351.herokuapp.com/order/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                const warning = window.confirm("Do you want to cancel the booking?");
                if (warning) {
                    const remainingOrders = orders.filter(order => order._id !== id);
                    setOrders(remainingOrders)
                    setSuccess(true)
                }
            })
    }
    const handleUpdate = (id) => {
        const data = { status: "Shipped" };
        fetch(`https://obscure-lowlands-73351.herokuapp.com/order/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('modified successfully')
                    setIsUpdate(true);
                }
            })
    }
    return (
        <div>
            <div className='container'>
                <h1 className='text-center text-style my-3'>All Bookings</h1>
                {
                    success && <div class="alert alert-danger" role="alert">
                        your order is cancelled
                    </div>
                }
                <div className='table-responsive'>
                    <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Date</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                                <th scope="col">Order</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        {
                            orders?.map((booking, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{booking.name}</td>
                                        <td>{booking.email}</td>
                                        <td>{booking.date}</td>
                                        <td>{booking.address}</td>
                                        <td>{booking.status}</td>
                                        <td>
                                            <button onClick={() => handleDelete(booking._id)} type="button" class="btn btn-outline-success m-2">Cancel</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleUpdate(booking._id)} type="button" class="btn btn-outline-success m-2">Confirm</button>
                                        </td>


                                    </tr>
                                </tbody>))
                        }



                    </table>

                </div>

            </div>
        </div>
    );
};

export default ManageOrders;