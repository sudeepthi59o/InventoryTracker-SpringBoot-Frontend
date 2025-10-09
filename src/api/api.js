import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
  
    let parsedAuth = null;

    try {
      const authData = localStorage.getItem('authData');
      parsedAuth = authData ? JSON.parse(authData) : null;
    } catch (e) {
      console.error('Error parsing authData from localStorage', e);
    }

    if (parsedAuth && parsedAuth.token) {
      config.headers["Authorization"] = `Bearer ${parsedAuth.token}`;
    }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authData");
        window.location.href = "/login"; 
      }
      return Promise.reject(error);
    }
  );

export default api;
