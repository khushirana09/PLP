import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";
import { toast } from "react-toastify";

const PLP = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("");

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/products");
            const data = await response.json();
            console.log("API DATA:", data);
            setProducts(data);
        } catch {
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "priceLowHigh") return a.price - b.price;
        if (sortBy === "priceHighLow") return b.price - a.price;
        if (sortBy === "rating") return b.rating?.rate - a.rating?.rate;
        return 0;
    });

    // delete function
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure ");
        if (!confirmDelete) return;
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
            });

            toast.success("Prouct deleted");
            //UPDATE UI
            setProducts(products.filter((p) => p._id !== id));
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="plp">
            <Sort sortBy={sortBy} setSortBy={setSortBy} />
            <ProductList products={sortedProducts}
                onDelete={handleDelete} />

        </div>
    );
};

export default PLP;
