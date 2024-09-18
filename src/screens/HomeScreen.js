import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { AuthContext } from '../components/contexts/AuthContext';

const HomeScreen = () => {
  const { token } = useContext(AuthContext);

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Ionicons name="home" size={40} color="tomato" />
      <Text style={tw`text-lg`}>Bearer Token:</Text>
      <Text style={tw`text-sm text-gray-600`}>{token || 'No token available'}</Text>
    </View>
  );
};

export default HomeScreen;

