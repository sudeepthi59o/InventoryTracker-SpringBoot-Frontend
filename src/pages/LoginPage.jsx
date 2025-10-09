import { AuthContext } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import api from '../api/api.js';
import { useForm } from "react-hook-form";

function LoginPage() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const { login, auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/products'); 
    }
  }, [auth.isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/user/login', { 
        userName: data.username, 
        password: data.password, 
        role: 'USER' 
      });
      login(response.data.token, response.data.role);
      navigate('/products');
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : "Something went wrong, please try again.";
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Root Error Message */}
          {errors.root && (
            <div className="text-red-500 text-center mb-4">
              <p>{errors.root.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
