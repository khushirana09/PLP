import React from 'react'

const Filters = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div>
            <h3>Category</h3>
            <select value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">All</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters