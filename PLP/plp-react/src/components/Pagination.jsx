import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div style={{ marginTop: "20px" }}>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    style={{
                        margin: "5px",
                        padding: "8px",
                        background:
                            currentPage === index + 1 ? "#333" : "#ddd",
                        color:
                            currentPage === index + 1 ? "#fff" : "#000",
                    }}
                >
                    {index + 1} {/* 🔥 THIS WAS MISSING */}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
