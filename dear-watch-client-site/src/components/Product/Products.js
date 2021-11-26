import React from 'react';

const Products = (props) => {
    const handleDelete = props.handleDelete;
    const { name, img, brand, _id } = props.product;
    return (
        <div className='col-lg-6 col-12  '>
            <div className='row  g-4 '>
                <div className='col-lg-6 col-12'>
                    <img src={img} class="img-fluid rounded-start img-size" alt="..." />
                </div>
                <div className='col-lg-6 col-12 bg-dark '>
                    <h3 className='text-style pt-5'>{name}</h3>
                    <h5 className='text-style my-4'>{brand}</h5>
                    <button onClick={() => handleDelete(_id)} type="button" class="btn btn-outline-info">Delete</button>
                </div>
            </div>

        </div>
    );
};

export default Products;