import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { Link } from "react-router-dom";

function Product({ product }) {
    const { auth } = useContext(AuthContext);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h2 className="font-semibold text-xl text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
            <p className="text-sm text-gray-500">Category: {product.categoryDTO.name}</p>
            <p className="text-sm text-gray-500">Supplier: {product.supplierDTO.name}</p>
            {auth.role === 'ADMIN' && (
                <div className="mt-2 flex space-x-4">
                    <Link to={`/edit-product/${product.id}`} className="text-indigo-600 hover:text-indigo-800">Edit</Link>
                    <Link to={`/delete-product/${product.id}`} className="text-red-600 hover:text-red-800">Delete</Link>
                </div>
            )}
        </div>
    );
}

export default Product;
