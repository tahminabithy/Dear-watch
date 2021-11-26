import React, { useEffect, useState } from 'react';
import Watch from '../Watch/Watch';

const Watches = () => {
    const [watches, setWatches] = useState([]);
    useEffect(() => {
        fetch("https://obscure-lowlands-73351.herokuapp.com/watches", {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => setWatches(data.slice(0, 6)))
    }, [])
    return (
        <div className='container mt-5'>
            <h3 className='text-style text-center'>Our Latest Collections</h3>
            <p className='text-center text-secondary'><small>World's best collections are here</small></p>
            <div className='row row-cols-1 row-cols-md-3 g-5 mt-5'>
                {
                    watches.map(watch => <Watch
                        key={watch._id}
                        watch={watch}></Watch>)
                }
            </div>
        </div>
    );
};

export default Watches;