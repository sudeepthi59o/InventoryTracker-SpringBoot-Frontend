import React, { useContext, useEffect, useState } from 'react';
import api from '../api/api';
import Supplier from './Supplier';
import { AuthContext } from '../components/auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function SupplierListPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetching suppliers data
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get('/supplier');
        setSuppliers(response.data);
      } catch (err) {
        console.error('Failed to fetch suppliers:', err);
        alert('Failed to load suppliers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth.isAuthenticated, navigate]);

  // Loading state
  if (loading) return <p className="text-center text-lg font-medium">Loading suppliers...</p>;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header and Navigation */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-indigo-700">Suppliers</h1>
        <div className="flex space-x-4">
          <Link to="/products">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Products</button>
          </Link>
          <Link to="/categories">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Categories</button>
          </Link>
          <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Logout</button>
        </div>
      </div>

      {/* Displaying suppliers */}
      {suppliers.length === 0 ? (
        <p className="text-center text-lg">No suppliers available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <Supplier supplier={supplier} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SupplierListPage;
