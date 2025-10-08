import React, { useContext, useEffect, useState } from 'react';
import api from '../api/api'; 
import Supplier from './Supplier';
import { AuthContext } from '../components/auth/AuthContext';

function SupplierListPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext)

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

  if (loading) return <p>Loading suppliers...</p>;

  return (
    <div>
      <h2>Supplier List</h2>
      <div>
        <button onClick={logout}>Logout</button>
        <Link to="/products">
          <button>Products</button>
        </Link>
        <Link to="/suppliers">
          <button>Suppliers</button>
        </Link>
      </div>
      {suppliers.length === 0 ? (
        <p>No suppliers available</p>
      ) : (
        <ul>
          {suppliers.map((supplier) => {
            return <li key={supplier.id}><Supplier supplier={supplier}/></li>})}
        </ul>
      )}
    </div>
  );
}

export default SupplierListPage;
