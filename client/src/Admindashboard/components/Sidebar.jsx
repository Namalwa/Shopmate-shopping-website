import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li>
          <Link
            to="/admin/add-product"
            className="text-gray-300 hover:text-white"
          >
            AddProduct
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/admin/products" className="text-gray-300 hover:text-white">
            ProductList
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
