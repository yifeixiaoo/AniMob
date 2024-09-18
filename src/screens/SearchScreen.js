import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`w-full p-4 items-center justify-center bg-gray-100`}>
        <View style={tw`flex-row bg-white w-full p-2 rounded-lg items-center`}>
          <Ionicons name="search" size={24} color="gray" />
          <TextInput
            style={tw`ml-2 flex-1`}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-lg`}>Search Results</Text>
      </View>
    </View>
  );
};

export default SearchScreen;

