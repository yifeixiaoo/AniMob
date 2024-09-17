import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAL_CLIENT_ID, MAL_USERNAME, MAL_PASSWORD } from '@env';

const malApiClient = axios.create({
  baseURL: 'https://myanimelist.net/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const getMalAccessToken = async () => {
  const body = new URLSearchParams({
    grant_type: 'password',
    client_id: MAL_CLIENT_ID,
    username: MAL_USERNAME,
    password: MAL_PASSWORD,
  });

  try {
    const response = await malApiClient.post('/auth/token', body.toString());
    const { access_token } = response.data;
    await AsyncStorage.setItem('token', access_token);
    return access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

malApiClient.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('token');

  if (!token) {
    token = await getMalAccessToken();
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default malApiClient;
