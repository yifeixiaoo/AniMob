import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import fetchWithToken from './../api/malApiClient';

const AnimeScreen = ({ route }) => {
  const { animeId } = route.params; // Get the anime ID from the route params
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const data = await fetchWithToken(`/anime/${animeId}?fields=alternative_titles,media_type`);
        setAnimeDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime details:', error);
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={tw`text-lg text-gray-600 mt-2`}>Loading anime details...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-50 p-4`}>
      {animeDetails && (
        <>
          <Image
            source={{ uri: animeDetails.main_picture.medium }}
            style={tw`w-full h-60 rounded-lg`}
          />
          <Text style={tw`text-2xl font-bold mt-4`}>{animeDetails.title}</Text>
          <Text style={tw`text-lg mt-2`}>Alternative Title: {animeDetails.alternative_titles.en || 'N/A'}</Text>
          <Text style={tw`text-lg mt-2`}>Media Type: {animeDetails.media_type || 'N/A'}</Text>
        </>
      )}
    </View>
  );
};

export default AnimeScreen;
