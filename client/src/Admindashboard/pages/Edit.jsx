import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: null,
    category: "ACCESSORIES",
    productType: "BAGS",
  });

  const navigate = useNavigate();

  const categoryOptions = {
    ACCESSORIES: ["BAGS", "JEWELRY", "STOCKINGS"],
    BEAUTY: ["MAKEUP", "LOTION", "SERUM"],
    KIDS: ["KIDS_SHOES", "KIDS_DRESSES", "KIDS_TOYS"],
    MEN: ["MEN_SHOES", "MEN_SHIRTS"],
    WOMEN: ["WOMEN_SHOES", "WOMEN_DRESSES"],
  };

  const { data, isLoading, error } = useQuery(["product", id], async () => {
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      credentials: "include"
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }, 
  {
    onSuccess: (data) => {
      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        category: data.category,
        productType: data.productType,
      });
    }
  });

  const { mutate, isLoading: isUpdating } = useMutation(
    async (updatedProduct) => {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct),
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    {
      onSuccess: (data) => {
        navigate(`/product/${data.id}`);
        toast.success("Product updated successfully!", {
          theme: "colored",
        });
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`, {
          theme: "colored",
        });
      }
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) : value,
    }));

    if (name === "category") {
      setFormData((prevData) => ({
        ...prevData,
        productType: categoryOptions[value][0],
      }));
    }
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);  
  };

  if (isLoading) return <div>Loading product data...</div>;
  if (error) return <div>Error loading product data: {error.message}</div>;

  return (
    <div className="max-w-md mx-auto mt-8">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            {Object.keys(categoryOptions).map((category) => (
              <option key={category} value={category}>
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Product Type:</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            {categoryOptions[formData.category].map((type) => (
              <option key={type} value={type}>
                {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default Edit;
