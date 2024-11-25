// // import React, { useState, useEffect } from "react";
// // import { useMutation, useQuery } from "react-query";
// // import { useNavigate, useParams } from "react-router-dom";


// // const fetchProduct = async (id) => {
// //   const response = await fetch(`http://localhost:4000/products/${id}`);
// //   if (!response.ok) {
// //     throw new Error("Failed to fetch product");
// //   }
// //   return await response.json();
// // };

// // const categoryProductTypes = {
// //   ACCESSORIES: ["BAGS", "JEWELRY", "STOCKINGS"],
// //   BEAUTY: ["MAKEUP", "LOTION", "SERUM"],
// //   KIDS: ["KIDS_SHOES", "KIDS_DRESSES", "KIDS_TOYS"],
// //   MEN: ["MEN_SHOES", "MEN_SHIRTS"],
// //   WOMEN: ["WOMEN_SHOES", "WOMEN_DRESSES"],
// // };

// // const uploadImage = async (image) => {
// //   const formData = new FormData();
// //   formData.append("file", image);
// //   formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

// //   const response = await fetch(
// //     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
// //     {
// //       method: "POST",
// //       body: formData,
// //     }
// //   );

// //   if (!response.ok) {
// //     const errorData = await response.json();
// //     console.error("Cloudinary upload error:", errorData);
// //     throw new Error(errorData.error?.message || "Image upload failed");
// //   }

// //   const data = await response.json();
// //   console.log("Cloudinary response:", data);
 
// //   return data.secure_url;
// // };

// // const addProduct = async (productData) => {
// //   const response = await fetch("http://localhost:4000/products", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     credentials: "include",
// //     body: JSON.stringify(productData),
// //   });

// //   if (!response.ok) {
// //     const errorData = await response.json();
// //     throw new Error(errorData.message || "Failed to add product");
// //   }

// //   return await response.json();
// // };

// // const AddProduct = () => {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     price: "",
// //     category: "",
// //     productType: "",
// //     image: null,
// //   });

// //   const [availableProductTypes, setAvailableProductTypes] = useState([]);
// //   const navigate = useNavigate();
// //   const { id } = useParams();

  
// //   const { data: product, error, isLoading } = useQuery(
// //     ["product", id],
// //     () => fetchProduct(id),
// //     {
// //       enabled: !!id, 
// //     }
// //   );

 
// //   useEffect(() => {
// //     if (product) {
// //       setFormData({
// //         title: product.title || "",
// //         description: product.description || "",
// //         price: product.price || "",
// //         category: product.category || "",
// //         productType: product.productType || "",
// //         image: null,
// //         createdBy: product.createdBy || "",
// //       });
// //       setAvailableProductTypes(categoryProductTypes[product.category] || []);
// //     }
// //   }, [product]);

// //   const mutation = useMutation({
// //     mutationFn: async () => {
// //       if (!formData.image) {
// //         throw new Error("Image is required");
// //       }

// //       const imageUrl = await uploadImage(formData.image);
// //       return addProduct({ ...formData, imageUrl });
// //     },

// //     onSuccess: (data) => {
// //       console.log(data)
// //       alert("helooo")
// //       // if (data?.id) {
// //       //   alert("Product added successfully!");
// //       //   navigate(`/product/${data.id}`);
// //       // } else {
// //       //   alert("Product added, but no ID returned.");
// //       // }
// //     },
// //   });

// //   const handleCategoryChange = (e) => {
// //     const selectedCategory = e.target.value;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       category: selectedCategory,
// //       productType: "",
// //     }));

// //     if (selectedCategory) {
// //       setAvailableProductTypes(categoryProductTypes[selectedCategory] || []);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: name === "price" ? parseFloat(value) : value,
// //     }));
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     const validFormats = ["image/jpeg", "image/png", "image/gif"];

// //     if (!validFormats.includes(file.type)) {
// //       alert("Invalid image format. Please upload a .jpeg, .png, or .gif file.");
// //       return;
// //     }

// //     setFormData((prevData) => ({
// //       ...prevData,
// //       image: file,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.image) {
// //       alert("Please upload an image.");
// //       return;
// //     }

// //     try {
// //       const imageUrl = await uploadImage(formData.image);

// //       const response = await fetch("http://localhost:4000/products", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         credentials: "include",
// //         body: JSON.stringify({
// //           ...formData,
// //           imageUrl,
// //         }),
// //       });

// //       const data = await response.json();
// //       console.log("Product added:", data);
// //       alert("Product added successfully!");
// //       // navigate(`/product/${data.id}`);
// //     } catch (error) {
// //       console.error("Error:", error);
// //       alert(error.message || "Failed to add product");
// //     }
// //   };

// //   if (isLoading) return <p>Loading product data...</p>;
// //   if (error) return <p>Error: {error.message}</p>;

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
// //       <label className="block mb-2">
// //         Title:
// //         <input
// //           type="text"
// //           name="title"
// //           value={formData.title}
// //           onChange={handleChange}
// //           required
// //           className="w-full p-2 border rounded"
// //         />
// //       </label>

// //       <label className="block mb-2">
// //         Description:
// //         <textarea
// //           name="description"
// //           value={formData.description}
// //           onChange={handleChange}
// //           required
// //           className="w-full p-2 border rounded"
// //         />
// //       </label>

// //       <label className="block mb-2">
// //         Price:
// //         <input
// //           type="number"
// //           name="price"
// //           value={formData.price}
// //           onChange={handleChange}
// //           required
// //           className="w-full p-2 border rounded"
// //         />
// //       </label>

// //       <label className="block mb-2">
// //         Category:
// //         <select
// //           name="category"
// //           value={formData.category}
// //           onChange={handleCategoryChange}
// //           required
// //           className="w-full p-2 border rounded"
// //         >
// //           <option value="">Select Category</option>
// //           <option value="ACCESSORIES">Accessories</option>
// //           <option value="BEAUTY">Beauty</option>
// //           <option value="KIDS">Kids</option>
// //           <option value="MEN">Men</option>
// //           <option value="WOMEN">Women</option>
// //         </select>
// //       </label>

// //       <label className="block mb-2">
// //         Product Type:
// //         <select
// //           name="productType"
// //           value={formData.productType}
// //           onChange={handleChange}
// //           required
// //           className="w-full p-2 border rounded"
// //           disabled={!formData.category}
// //         >
// //           <option value="">Select Product Type</option>
// //           {availableProductTypes.map((type) => (
// //             <option key={type} value={type}>
// //               {type}
// //             </option>
// //           ))}
// //         </select>
// //       </label>

// //       <label className="block mb-2">
// //         Product Image:
// //         <input
// //           type="file"
// //           name="image"
// //           onChange={handleImageChange}
// //           required
// //           className="w-full p-2 border rounded"
// //         />
// //       </label>

// //       <button
// //         type="submit"
// //         disabled={mutation.isLoading}
// //         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //       >
// //         {mutation.isLoading ? "Adding Product..." : "Add Product"}
// //       </button>
// //     </form>
// //   );
// // };

// // export default AddProduct;


// import React, { useState } from "react";
// import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";

// const uploadImage = async (image) => {
//   const formData = new FormData();
//   formData.append("file", image);
//   formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error?.message || "Image upload failed");
//   }

//   const data = await response.json();
//   return data.secure_url;
// };

// const addProduct = async (productData) => {
//   const response = await fetch("http://localhost:4000/products", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(productData),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add product");
//   }
//   return await response.json();
// };

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     image: null,
//     category: "",
//     productType: "",
//   });

//   const navigate = useNavigate();

//   const mutation = useMutation({
//     mutationFn: async () => {
//       if (!formData.image) {
//         throw new Error("Image is required");
//       }

//       const imageUrl = await uploadImage(formData.image);
//       return addProduct({ ...formData, imageUrl });
//     },
//     onSuccess: (data) => {
//       alert("Product added successfully!");
//       navigate(`/product/${data.id}`);
//     },
//     onError: (error) => {
//       alert(error.message || "Failed to add product");
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === "price" ? (value === "" ? "" : parseFloat(value)) : value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       image: e.target.files[0],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
//       <label className="block mb-2">
//         Title:
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </label>
//       <label className="block mb-2">
//         Description:
//         <input
//           type="text"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </label>
//       <label className="block mb-2">
//         Category:
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </label>
//       <label className="block mb-2">
//         Product Type:
//         <input
//           type="text"
//           name="productType"
//           value={formData.productType}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </label>
//       <label className="block mb-2">
//         Price:
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </label>
//       <label className="block mb-2">
//         Image:
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </label>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         disabled={mutation.isLoading}
//       >
//         {mutation.isLoading ? "Uploading..." : "Add Product"}
//       </button>
//     </form>
//   );
// };

// export default AddProduct;
// import React, { useState } from "react";
// import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const uploadImage = async (image) => {
//   const formData = new FormData();
//   formData.append("file", image);
//   formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

//   const response = await fetch(
//     `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error?.message || "Image upload failed");
//   }

//   const data = await response.json();
//   return data.secure_url;
// };

// const addProduct = async (productData) => {
//   const response = await fetch("http://localhost:4000/products", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(productData),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add product");
//   }
//   return await response.json();
// };

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: 0,
//     image: null,
//     category: "ACCESSORIES",
//     productType: "BAGS",
//   });

//   const categoryOptions = {
//     ACCESSORIES: ["BAGS", "JEWELRY", "STOCKINGS"],
//     BEAUTY: ["MAKEUP", "LOTION", "SERUM"],
//     KIDS: ["KIDS_SHOES", "KIDS_DRESSES", "KIDS_TOYS"],
//     MEN: ["MEN_SHOES", "MEN_SHIRTS"],
//     WOMEN: ["WOMEN_SHOES", "WOMEN_DRESSES"],
//   };

//   const navigate = useNavigate();

//   const mutation = useMutation({
//     mutationFn: async () => {
//       if (!formData.image) {
//         throw new Error("Image is required");
//       }

//       const imageUrl = await uploadImage(formData.image);
//       return addProduct({ ...formData, imageUrl });
//     },
//     onSuccess: (data) => {
//       toast.success("Product added successfully!");
//       navigate(`/product/${data.id}`);
//     },
//     onError: (error) => {
//       toast.error(error.message || "Failed to add product");
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === "price" ? parseFloat(value) : value, // Ensure price is parsed as a float
//     }));

//     if (name === "category") {
//       setFormData((prevData) => ({
//         ...prevData,
//         productType: categoryOptions[value][0],
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       image: e.target.files[0],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate();
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <ToastContainer />
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">Category:</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             {Object.keys(categoryOptions).map((category) => (
//               <option key={category} value={category}>
//                 {category.charAt(0) + category.slice(1).toLowerCase()}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">Product Type:</label>
//           <select
//             name="productType"
//             value={formData.productType}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             {categoryOptions[formData.category].map((type) => (
//               <option key={type} value={type}>
//                 {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">Price:</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           disabled={mutation.isLoading}
//         >
//           {mutation.isLoading ? "Uploading..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Image upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};

const addProduct = async (productData) => {
  const token = localStorage.getItem('authToken'); // Ensure you send the token

  const response = await fetch("http://localhost:4000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
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
