import axios from "axios";

const api = axios.create({
    baseUrl: 'http://localhost:9000',
    headers : {
        'Content-Type' : 'application/json'
    },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config; // Return the config so the request proceeds
  },
  (error) => Promise.reject(error)
);

export default api;
