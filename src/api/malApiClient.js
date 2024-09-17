import axios from 'axios';
import { MAL_USERNAME } from '@env';

const malApiClient = axios.create({
  baseURL: 'https://api.myanimelist.net/v2/auth/token',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

malApiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default malApiClient;