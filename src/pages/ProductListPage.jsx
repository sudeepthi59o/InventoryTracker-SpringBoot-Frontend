import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/auth/AuthContext";
import Product from "./Product";

function ProductListPage() {
    const { auth } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);


    const { control, watch} = useForm({
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
      console.log("********");
      console.log(response);
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
        console.log("********");
        console.log(categoryResponse);
        console.log("********");
        console.log(supplierResponse);
        setCategories(categoryResponse.data);
        setSuppliers(supplierResponse.data);
        
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

      <button type="button" onClick={fetchData}>
          Show Filtered Data
        </button>
      </form>
          
        </div>
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