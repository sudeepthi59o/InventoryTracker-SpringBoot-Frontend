import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';
import CategoryListPage from './pages/CategoryListPage';
import SupplierListPage from './pages/SupplierListPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<PrivateRoute adminOnly={true} element={<RegisterPage/>}/>}/>
          <Route path="/products" element={<ProductListPage/>}/>
          <Route path="/categories" element={<CategoryListPage/>}/>
          <Route path="/supplier" element={<SupplierListPage/>}/>
          <Route path="/add-product" element={<PrivateRoute adminOnly={true} element={<ProductFormPage/>}/>}/>
          <Route path="/edit-product/:id" element={<PrivateRoute adminOnly={true} element={<ProductFormPage/>}/>}/>
          <Route path="/delete-product/:id" element={<PrivateRoute adminOnly={true} element={<ProductFormPage/>}/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );

}

export default App;
