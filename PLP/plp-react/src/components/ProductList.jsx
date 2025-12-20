import ProductCard from "./ProductCard";

const ProductList = ({ products, onDelete }) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product._id} product={product} onDelete={onDelete} />
            ))}
        </div>
    );
};
export default ProductList;