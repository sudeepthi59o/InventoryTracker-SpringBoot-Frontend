import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function ProductFormPage() {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchCategoriesAndSuppliers = async () => {
      try {
        const categoryResponse = await api.get('/category');
        const supplierResponse = await api.get('/supplier');

        setCategories(categoryResponse.data);
        setSuppliers(supplierResponse.data);
      } catch (err) {
        console.error('Failed to fetch categories and suppliers:', err);
        setError('Failed to load categories or suppliers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndSuppliers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const categoryDTO = categories.find((category) => category.id === parseInt(data.categoryId));
      const supplierDTO = suppliers.find((supplier) => supplier.id === parseInt(data.supplierId));

      const productData = {
        ...data,
        categoryDTO,  
        supplierDTO,
      };

      const response = await api.post('/product', productData);
      alert('Product added successfully');
      reset();
      navigate('/products');
    } catch (err) {
      console.error('Failed to add product:', err);
      alert('Error adding product. Please try again.');
    }
  };

  if (loading) return <p className="text-center text-lg font-medium">Loading categories and suppliers...</p>;
  if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name', { 
              required: 'Product name is required', 
              minLength: { value: 2, message: 'Product name must be at least 2 characters' },
              maxLength: { value: 100, message: 'Product name must be less than 100 characters' },
            })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
          <input
            id="price"
            type="number"
            step={0.01}
            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('price', { 
              required: 'Product price is required',
              min: { value: 0, message: 'Price must be greater than 0' },
            })}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        {/* Product Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
          <input
            id="quantity"
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('quantity', { 
              required: 'Product quantity is required',
              min: { value: 1, message: 'Quantity must be at least 1' },
            })}
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-lg font-medium text-gray-700">Category</label>
          <select
            id="categoryId"
            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('categoryId', { required: 'Category is required' })}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
        </div>

        {/* Supplier Selection */}
        <div className="mb-4">
          <label htmlFor="supplierId" className="block text-lg font-medium text-gray-700">Supplier</label>
          <select
            id="supplierId"
            className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('supplierId', { required: 'Supplier is required' })}
          >
            <option value="">Select a Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierId && <p className="text-red-500 text-sm mt-1">{errors.supplierId.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductFormPage;
