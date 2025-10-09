import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function DeleteProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        alert('Error fetching product data');
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/product/${id}`);
      alert('Product deleted successfully');
      navigate('/products'); // Redirect to the products list page
    } catch (err) {
      alert('Error deleting product:', err);
    }
  };

  if (!product) return <p className="text-center text-lg font-medium">Loading product...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">
        Are you sure you want to delete this product?
      </h2>
      
      <div className="text-center text-xl font-medium mb-6">
        <strong>{product.name}</strong>
        <div className="text-gray-600">
          ${product.price} - {product.quantity} in stock
        </div>
      </div>
      
      <div className="flex justify-between gap-4">
        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
        >
          Confirm Delete
        </button>
        <button
          onClick={() => navigate('/products')}
          className="w-full bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteProductPage;
