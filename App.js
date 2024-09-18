import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './src/components/NavBar';
import { AuthProvider } from './src/components/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </AuthProvider>
  );
}
