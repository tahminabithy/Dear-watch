import React, { useEffect, useState } from 'react';
import Products from '../Product/Products';
import Watch from '../Watch/Watch';

const ManageProducts = () => {
    const [watches, setWatches] = useState([]);
    useEffect(() => {
        fetch("https://obscure-lowlands-73351.herokuapp.com/watches", {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => setWatches(data))
    }, [])


    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://obscure-lowlands-73351.herokuapp.com/watch/${id}`, {
            method: "DELETE",

        })
            .then(res => res.json())
            .then(data => {
                const Isconfirm = window.confirm('do you want to delete sure?');
                if (Isconfirm) {
                    alert('sucessfully deleted')
                    const remainingWatch = watches.filter(watch => watch._id !== id);
                    setWatches(remainingWatch)
                }
            })
    }
    return (
        <div className='container'>
            <div className='row g-5 rounded shadow-lg mt-5'>
                {
                    watches.map(watch => <Products
                        key={watch._id}
                        product={watch}
                        handleDelete={handleDelete}></Products>)
                }
            </div>
        </div>
    );
};

export default ManageProducts;