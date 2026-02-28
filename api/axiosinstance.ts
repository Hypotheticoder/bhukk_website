import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE||'http://localhost:8000',
  baseURL: import.meta.env.VITE_API_BASE||'https://bhukkwebbackend.naiyo24.com',
  timeout: 10000,
});

export default axiosInstance;