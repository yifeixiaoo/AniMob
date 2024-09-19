import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAL_CLIENT_ID, MAL_USERNAME, MAL_PASSWORD } from '@env';

const malApiURI = 'https://api.myanimelist.net/v2';

export const getMalAccessToken = async () => {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', MAL_CLIENT_ID);
  formData.append('username', MAL_USERNAME);
  formData.append('password', MAL_PASSWORD);

  try {
    const response = await fetch(malApiURI + '/auth/token', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    const { access_token } = data;

    await AsyncStorage.setItem('token', access_token);

    return access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.message || error);
    throw error;
  }
};

const fetchWithToken = async (endpoint, options = {}) => {
  try {
    let token = await AsyncStorage.getItem('token');
    if (!token) {
      token = await getMalAccessToken();
    }

    const response = await fetch(`${malApiURI}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error making API request:', error.message || error);
    throw error;
  }
};

export default fetchWithToken;


