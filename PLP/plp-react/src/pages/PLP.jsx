import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";

const PLP = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // starts as true
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // ✅ FIXED: added try/catch + loading handling
    const fetchProducts = async () => {
        try {
            setLoading(true); // start loading before fetch

            const res = await fetch(
                `http://localhost:5000/api/products?page=${currentPage}&limit=6&category=${selectedCategory}&search=${debouncedSearch}`
            );


            if (!res.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await res.json();

            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // 🔥 VERY IMPORTANT
        }
    };

    // debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500); //delay
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, debouncedSearch, selectedCategory]);

    // if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === "priceLowHigh") return a.price - b.price;
        if (sortBy === "priceHighLow") return b.price - a.price;
        if (sortBy === "rating") return b.rating?.rate - a.rating?.rate;
        return 0;
    });

    // delete function
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
            });

            toast.success("Product deleted");

            // UI update
            setProducts(products.filter((p) => p._id !== id));
        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="plp">
            <Sort sortBy={sortBy} setSortBy={setSortBy} />

            <ProductList
                products={sortedProducts}
                onDelete={handleDelete}
            />
            {loading && <p>Loading products...</p>}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
            <input type="text" placeholder="Search products..."
                value={search} onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // reset page
                }}
            />
            <select value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                }}>
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
            </select>
        </div>
    );
};

export default PLP;
