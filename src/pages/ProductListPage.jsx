import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/auth/AuthContext";

function ProductListPage() {
    const { auth } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const { control, watch} = useForm({
    defaultValues: {
      category: '',
      supplier: ''
    }
  });

  const filters = watch();


    useEffect(() => {async function fetchData() {
        try {
        const response = await api.get('/product/filter', { params: filters });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();    
    },[filters])

    useEffect(() => { async function fetchSelectData() {
        try {
        const [categoryResponse, supplierResponse] = await Promise.all([
          api.get('/category'),
          api.get('/supplier')
        ]);
        setCategories(categoryResponse.data);
        console.log(categoryResponse);
        setSuppliers(supplierResponse.data);
        console.log(supplierResponse);
      } catch (error) {
        console.error('Error fetching categories or suppliers:', error);
      }
    };
    fetchSelectData();
    }, [])

    return (
        <div>
            <h1>Product List</h1>

        <div>
      <form>
        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div>
          <Controller
            name="supplier"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </form>
          
        </div>
            <ul>
                {products.map((product) => {
                <li key={product.id}>{product.name} - {product.category} - {product.supplier}{auth.role === 'admin' && (
              <div>
                <Link to={`/edit-product/${product.id}`}>Edit</Link>
                <Link to={`/delete-product/${product.id}`}>Delete</Link>
              </div>
            )}</li>})}
            </ul>

            {auth.role === 'admin' && (
        <Link to="/add-product">
          <button>Add New Product</button>
        </Link>
      )}
        </div>
    )
}

export default ProductListPage;