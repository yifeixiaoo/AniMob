import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import tw from 'twrnc';

const SearchScreen = () => {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Ionicons name="search" size={40} color="tomato" />
      <Text style={tw`text-lg`}>Search Screen</Text>
    </View>
  );
};

export default SearchScreen;
