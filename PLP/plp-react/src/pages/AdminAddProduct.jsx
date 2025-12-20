import React, { useState } from "react";
import { toast } from "react-toastify";

const AdminAddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        category: "",
        image: "",
        rating: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //convert string to number
        const payload = {
            ...product,
            price: Number(product.price),
            rating: { rate: Number(product.rating) }
        };

        try {
            await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            });
            toast.success("Product added sucessfully");

            //reset form after success
            setProduct({
                title: "",
                price: "",
                category: "",
                image: "",
                rating: ""
            });

        } catch {
            toast.error("Failed to add product");
        }
    };


    return (
        <div style={{ padding: "20px" }}>
            <h2>Add New Product (Admin) </h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Tilte"
                    value={product.title}
                    onChange={handleChange} />
                <br /><br />
                <input name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange} />
                <br /><br />
                <input name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange} />
                <br /><br />
                <input name="image"
                    placeholder="Image"
                    value={product.image}
                    onChange={handleChange} />
                <br /><br />
                <input name="rating"
                    placeholder="Rating"
                    value={product.rating}
                    onChange={handleChange} />
                <br /><br />
                <button type="submit">Add Product</button>
            </form>

        </div>
    );

};
export default AdminAddProduct;