import React from 'react'

const Sort = ({ sortBy, setSortBy }) => {
    return (
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="rating">Rating</option>
        </select>
    );
};

export default Sort