import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';
import fetchWithToken from './../api/malApiClient';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const data = await fetchWithToken(`/anime?q=${query}`);
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const navigation = useNavigation();

  const renderAnimeCard = ({ item }) => (
    <View style={tw`w-11/12 bg-white shadow-md rounded-lg p-4 mb-4 mx-auto`}>
            <TouchableOpacity onPress={() => navigation.navigate('AnimeScreen', { animeId: item.node.id, animeTitle: item.node.title })}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={{ uri: item.node.main_picture.medium }}
          style={tw`w-24 h-32 rounded-lg`}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-lg font-semibold mb-2`}>{item.node.title}</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <View style={tw`absolute top-3 left-5 right-5 z-10`}>
        <View style={tw`bg-white shadow-lg rounded-3xl p-1`}>
          <View style={tw`flex-row items-center bg-white rounded-3xl p-2`}>
            <Feather name="search" color={"gray"} size={24} />
            <TextInput
              style={tw`ml-3 flex-1 text-base text-gray-800`}
              placeholder="Search anime..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      <View style={tw`flex-1`}>
        {loading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={tw`text-lg text-gray-600 mt-2`}>Searching...</Text>
          </View>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.node.id.toString()}
            renderItem={renderAnimeCard}
            contentContainerStyle={tw`pt-1 pb-40`}
            style={tw`pt-19`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-lg text-gray-600`}>No results found.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

