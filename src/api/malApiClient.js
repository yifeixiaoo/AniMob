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

    // Await the response.json() to correctly parse the response body
    const data = await response.json();
    const { access_token } = data;

    // Save the token in AsyncStorage
    await AsyncStorage.setItem('token', access_token);
    
    return access_token;
  } catch (error) {
    // Log detailed error information
    console.error('Error fetching access token:', error.message || error);
    throw error;
  }
};

export default malApiURI;

