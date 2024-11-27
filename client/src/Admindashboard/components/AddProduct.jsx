import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Image upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};

const addProduct = async (productData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch("http://localhost:4000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add product");
  }
  return await response.json();
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    image: null,
    category: "ACCESSORIES",
    productType: "BAGS",
  });

  const categoryOptions = {
    ACCESSORIES: ["BAGS", "JEWELRY", "STOCKINGS"],
    BEAUTY: ["MAKEUP", "LOTION", "SERUM"],
    KIDS: ["KIDS_SHOES", "KIDS_DRESSES", "KIDS_TOYS"],
    MEN: ["MEN_SHOES", "MEN_SHIRTS"],
    WOMEN: ["WOMEN_SHOES", "WOMEN_DRESSES"],
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!formData.image) {
        throw new Error("Image is required");
      }

      const imageUrl = await uploadImage(formData.image);
      return addProduct({ ...formData, imageUrl });
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
      navigate("/admin/products");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add product");
    },
  });

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
    mutation.mutate();
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title:
          </label>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Category:
          </label>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Product Type:
          </label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            {categoryOptions[formData.category].map((type) => (
              <option key={type} value={type}>
                {type
                  .split("_")
                  .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                  .join(" ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Price:
          </label>
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
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
