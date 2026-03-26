import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

// Interceptor para adicionar o token de autorização
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('blx_token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erros globais (ex: 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Opcional: Redirecionar para o login ou limpar o token
      localStorage.removeItem('blx_token');
      localStorage.removeItem('blx_user');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
