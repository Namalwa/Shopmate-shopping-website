import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message || "Failed to fetch product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <ToastContainer />
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        product && (
          <div className="p-4 bg-white rounded-md shadow">
            <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Type: {product.productType}</p>
            <img src={product.imageUrl} alt={product.title} className="mt-4"/>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
