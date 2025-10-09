import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useForm } from "react-hook-form";
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

    const { register, watch, handleSubmit } = useForm({
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

    useEffect(() => { 
        async function fetchSelectData() {
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

    if (loading) return <p className="text-center text-lg font-medium">Loading products...</p>;

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-indigo-700">Explore Our Products</h1>
                <div className="flex space-x-4">
                    <Link to="/categories">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Categories</button>
                    </Link>
                    <Link to="/suppliers">
                        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Suppliers</button>
                    </Link>
                    <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Logout</button>
                </div>
            </div>

            <form onSubmit={handleSubmit(() => fetchData(filters))} className="space-y-4">
                <div className="flex space-x-6">
                    <div className="flex-1">
                        <label className="block text-lg font-medium mb-2">Select Category</label>
                        <select {...register('category')} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-lg font-medium mb-2">Select Supplier</label>
                        <select {...register('supplier')} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Supplier</option>
                            {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.name}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
                    Show Data
                </button>
            </form>

            <div className="mt-6">
                {/* Product List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {auth.role === 'ADMIN' && (
                <Link to="/add-product">
                    <button className="mt-4 bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 w-full">
                        Add New Product
                    </button>
                </Link>
            )}
        </div>
    );
}

export default ProductListPage;
