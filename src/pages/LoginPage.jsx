import { AuthContext } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import api from '../api/api.js';
import { useForm } from "react-hook-form";

function LoginPage() {
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm()
  const navigate = useNavigate();
  const { login, auth } = useContext(AuthContext);

    useEffect(() => {
    if (auth.isAuthenticated) {
        navigate('/products'); 
    }
    }, [auth.isAuthenticated, navigate]);

    const onSubmit = async (data) => {
    try {
      const response = await api.post('/user/login', { userName: data.username, password: data.password, role: 'USER'});
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true})} />
      {errors.username && <span>Username is required</span>}
      <input {...register("password", { required: true})} />
      {errors.password && <span>Password is required</span>}
      <input type="submit" />
    </form>
  );
}

export default LoginPage;