import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMalAccessToken } from '../../api/malApiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      let storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        storedToken = await getMalAccessToken();
      }
      setToken(storedToken);
    };

    fetchToken();
  }, []);

  const value = {
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
