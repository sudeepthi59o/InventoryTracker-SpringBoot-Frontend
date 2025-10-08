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

  if (!product) return <p>Loading product...</p>;

  return (
    <div>
      <h2>Are you sure you want to delete this product?</h2>
      <div>
        <strong>{product.name}</strong> - {product.price} - {product.quantity}
      </div>
      <div>
        <button onClick={handleDelete}>Confirm Delete</button>
        <button onClick={() => navigate('/products')}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteProductPage;
