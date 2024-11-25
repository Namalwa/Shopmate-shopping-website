import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/products");
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message || "Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} className="p-4 bg-white rounded-md shadow mb-4">
              <h3 className="text-xl font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Type: {product.productType}</p>
              <img src={product.imageUrl} alt={product.title} className="mt-2"/>
              <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
