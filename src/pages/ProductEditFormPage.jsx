import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

function ProductEditFormPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await api.get('/category');
        const supplierResponse = await api.get('/supplier');
        const productResponse = await api.get(`/product/${id}`);

        setCategories(categoryResponse.data);
        setSuppliers(supplierResponse.data);
        setProduct(productResponse.data);

        reset({
          name: productResponse.data.name,
          price: productResponse.data.price,
          quantity: productResponse.data.quantity,
          categoryId: productResponse.data.categoryDTO.id,
          supplierId: productResponse.data.supplierDTO.id,
        });

      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load categories, suppliers, or product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const categoryDTO = categories.find((category) => category.id === parseInt(data.categoryId));
      const supplierDTO = suppliers.find((supplier) => supplier.id === parseInt(data.supplierId));

      const updatedProductData = {
        ...data,
        categoryDTO,  
        supplierDTO, 
      };

      await api.put(`/product/${id}`, updatedProductData);
      alert('Product updated successfully');
      navigate('/products'); 
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Error updating product. Please try again.');
    }
  };

  if (loading) return <p className="text-center text-lg font-medium">Loading categories, suppliers, and product...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register('name', {
              required: 'Product name is required',
              minLength: {
                value: 2,
                message: 'Product name must be at least 2 characters',
              },
              maxLength: {
                value: 100,
                message: 'Product name must be less than 100 characters',
              },
            })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Price</label>
          <input
            type="number"
            step={0.01}
            {...register('price', {
              required: 'Product price is required',
              min: { value: 0, message: 'Price must be greater than 0' },
            })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Product Quantity */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            {...register('quantity', {
              required: 'Product quantity is required',
              min: { value: 1, message: 'Quantity must be at least 1' },
            })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Category</label>
          <select
            {...register('categoryId', { required: 'Category is required' })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
        </div>

        {/* Supplier Select */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Supplier</label>
          <select
            {...register('supplierId', { required: 'Supplier is required' })}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierId && <p className="text-red-500 text-sm">{errors.supplierId.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductEditFormPage;
