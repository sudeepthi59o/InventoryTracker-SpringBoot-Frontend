import React, { useContext, useEffect, useState } from 'react';
import api from '../api/api';
import Category from './Category';
import { AuthContext } from '../components/auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, auth } = useContext(AuthContext)
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth.isAuthenticated, navigate]);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div>
      <h2>Category List</h2>
      <div>
        <button onClick={logout}>Logout</button>
        <Link to="/products">
          <button>Products</button>
        </Link>
        <Link to="/suppliers">
          <button>Suppliers</button>
        </Link>
      </div>
      {categories.length === 0 ? (
        <p>No categories available</p>
      ) : (
        <ul>
          {categories.map((category) => { return <li key={category.id}><Category category={category}/></li>})}
         
        </ul>
      )}
    </div>
  );
}

export default CategoryListPage;
