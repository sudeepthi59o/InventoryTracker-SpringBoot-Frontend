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

  if (loading) return <p>Loading categories, suppliers, and product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
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
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            step={0.01}
            {...register('price', {
              required: 'Product price is required',
              min: { value: 0, message: 'Price must be greater than 0' },
            })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="number"
            {...register('quantity', {
              required: 'Product quantity is required',
              min: { value: 1, message: 'Quantity must be at least 1' },
            })}
          />
          {errors.quantity && <p>{errors.quantity.message}</p>}
        </div>

        <div>
          <label>Category</label>
          <select {...register('categoryId', { required: 'Category is required' })}>
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p>{errors.categoryId.message}</p>}
        </div>

        <div>
          <label>Supplier</label>
          <select {...register('supplierId', { required: 'Supplier is required' })}>
            <option value="">Select a Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplierId && <p>{errors.supplierId.message}</p>}
        </div>

        <div>
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
}

export default ProductEditFormPage;
