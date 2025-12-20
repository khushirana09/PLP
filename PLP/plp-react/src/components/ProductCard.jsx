import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
    const navigate = useNavigate();
    return (
        <div className='card'>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>⭐ {product.rating?.rate}</p>
            <button>Add to Cart</button>
            <button onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>
            <button onClick={() => onDelete(product._id)}>
                Delete
            </button>
        </div>
    );
};

export default ProductCard