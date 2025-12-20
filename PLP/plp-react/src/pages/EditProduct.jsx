import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        price: "",
        image: "",
        category: "",
    });

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setForm(data));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            toast.success("Product updates");
        } catch {
            toast.error("Update failed");
        }

        navigate("/");
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Product</h2>

            <input name='title'
                value={form.title}
                onChange={handleChange}
                placeholder='Title' />
            <input name='price'
                value={form.price}
                onChange={handleChange}
                placeholder='Price' />
            <input name='image'
                value={form.image}
                onChange={handleChange}
                placeholder='Image' />
            <input name='category'
                value={form.category}
                onChange={handleChange}
                placeholder='Category' />

            <button type='submit'>Update Product</button>
        </form>
    );
};

export default EditProduct