import axios from "axios";

const API_BASE_URL = "http://localhost:4000"; // Change if using a different port

export const uploadProduct = async (productData) => {
  try {
    const formData = new FormData();
    for (let key in productData) {
      formData.append(key, productData[key]);
    }
    const response = await axios.post(`${API_BASE_URL}/products`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
