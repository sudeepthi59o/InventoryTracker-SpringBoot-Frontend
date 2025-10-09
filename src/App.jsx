import './App.css'
import {BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import CategoryListPage from './pages/CategoryListPage';
import SupplierListPage from './pages/SupplierListPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './pages/PrivateRoute';
import ProductEditFormPage from './pages/ProductEditFormPage.jsx';
import DeleteProductPage from './pages/DeleteProductPage.jsx';
import { useEffect } from 'react';

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    let parsedAuth = null;

    try {
      const authData = localStorage.getItem('authData');
      parsedAuth = authData ? JSON.parse(authData) : null;
    } catch (e) {
      console.error('Error parsing authData from localStorage', e);
    }
    if (!parsedAuth || !parsedAuth.token) {
      navigate('/login');
    }
  }, [navigate]);

  return null;
}

function App() {

  return (
    <AuthProvider>
      <Router>
        <AuthRedirect/>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/products" element={<ProductListPage/>}/>
          <Route path="/categories" element={<CategoryListPage/>}/>
          <Route path="/suppliers" element={<SupplierListPage/>}/>
          <Route path="/add-product" element={<PrivateRoute adminOnly={true} element={<ProductFormPage/>}/>}/>
          <Route path="/edit-product/:id" element={<PrivateRoute adminOnly={true} element={<ProductEditFormPage/>}/>}/>
          <Route path="/delete-product/:id" element={<PrivateRoute adminOnly={true} element={<DeleteProductPage/>}/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );

}

export default App;
