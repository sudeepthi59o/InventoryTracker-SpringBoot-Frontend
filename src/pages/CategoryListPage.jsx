import React, { useContext, useEffect, useState } from 'react';
import api from '../api/api';
import Category from './Category';
import { AuthContext } from '../components/auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch Categories on Component Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category'); 
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err); 
        alert('Failed to load categories. Please try again later.'); 
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); 

  // Redirect user if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth.isAuthenticated, navigate]);

  // Loading State
  if (loading) return <p className="text-center text-lg font-medium">Loading categories...</p>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-indigo-700">Categories</h1>
        <div className="flex space-x-4">
          <Link to="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Products</button>
          </Link>
          <Link to="/suppliers">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Suppliers</button>
          </Link>
            <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Logout</button>
        </div>
      </div>

      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <Category category={category} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default CategoryListPage;
