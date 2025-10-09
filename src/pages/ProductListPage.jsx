import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/AuthContext";
import Product from "./Product";

function ProductListPage() {
    const { logout, auth } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const { register, watch, handleSubmit} = useForm({
    defaultValues: {
      category: '',
      supplier: ''
    }
  });

  const filters = watch();


    async function fetchData() {
        setLoading(true);
    try {
      const response = await api.get('/product/filter', { params: filters });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
    };

    useEffect(() => { async function fetchSelectData() {
        try {
        const [categoryResponse, supplierResponse] = await Promise.all([
          api.get('/category'),
          api.get('/supplier')
        ]);
        setCategories(categoryResponse.data);
        setSuppliers(supplierResponse.data);
        
      } catch (error) {
        console.error('Error fetching categories or suppliers:', error);
      }
    };
    fetchSelectData();
    }, []);


  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth.isAuthenticated, navigate]);

    if (loading) return <p>Loading products...</p>;

    return (
    <div>
      <h1>Product List</h1>

      <div>
        <button onClick={logout}>Logout</button>
        <Link to="/categories">
          <button>Categories</button>
        </Link>
        <Link to="/suppliers">
          <button>Suppliers</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit(() => fetchData(filters))}>
        <div>
          <label>Select Category</label>
          <select {...register('category')}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Supplier</label>
          <select {...register('supplier')}>
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Show Filtered Data</button>
      </form>
          
            <ul>
                {products.map((product) => {
                return <li key={product.id}><Product product={product}/></li>})}
            </ul>

            {auth.role === 'ADMIN' && (
        <Link to="/add-product">
          <button>Add New Product</button>
        </Link>
      )}
        </div>
    )
}

export default ProductListPage;