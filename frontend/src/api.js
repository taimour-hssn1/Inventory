import axios from 'axios';
import { refreshAccessToken } from './refreshToken'; // your helper

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('access');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  res => res,
  async (error) => {
    if (error.response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config); // Retry original request
      }
    }
    return Promise.reject(error);
  }
);

export default api;
