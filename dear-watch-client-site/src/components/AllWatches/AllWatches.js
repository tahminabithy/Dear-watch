import React, { useEffect, useState } from 'react';
import Menubar from '../Menubar/Menubar';
import Watch from '../Watch/Watch';

const AllWatches = () => {
    const [watches, setWatches] = useState([]);
    useEffect(() => {
        fetch('https://obscure-lowlands-73351.herokuapp.com/watches')
            .then(res => res.json())
            .then(data => setWatches(data))
    }, [])
    return (
        <div>
            <Menubar></Menubar>
            <div className='container mt-5'>
                <h3 className='text-style text-center'>Our Best Collections</h3>
                <p className='text-center text-secondary'><small>World's best collections are here</small></p>
                <div className='row row-cols-1 row-cols-md-3 g-5 mt-5'>
                    {
                        watches.map(watch => <Watch
                            key={watch._id}
                            watch={watch}></Watch>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllWatches;