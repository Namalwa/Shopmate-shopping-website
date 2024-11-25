import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const ProductCard = () => {
  const { id } = useParams();
 
  if (!id) {
    return <h2 className="text-3xl text-center font-semibold mt-5 text-red-500">Invalid Product ID</h2>;
  }

  const { isLoading, isError, error, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch product");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <h2 className="text-3xl text-center font-semibold mt-5">Loading... Please Wait...</h2>;
  }

  if (isError) {
    return <h2 className="text-3xl text-center font-semibold mt-5 text-red-500">{error.message}</h2>;
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.title}</h3>
        <p className="text-gray-600">Category: {product.category}</p> 
        <p className="mt-2">{product.description}</p>
        <p className="mt-2">Price: ${product.price}</p>
        <p className="mt-2">Product Type: {product.productType}</p> 
        <button
          onClick={() => alert(`Redirect to product details for ${product.title}`)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
