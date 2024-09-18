import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import fetchWithToken from './../api/malApiClient';

const HomeScreen = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchAnimeRankings = async () => {
      try {
        const data = await fetchWithToken('/anime/ranking');
        setRankings(data.data || []);
      } catch (error) {
        console.error('Error fetching anime rankings:', error);
      }
    };

    fetchAnimeRankings();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-4`}>
        {rankings.map(({ node, ranking }, index) => (
          <View
            key={node.id}
            style={tw`flex-row items-center bg-white shadow-lg rounded-lg p-4 mb-4`}
          >
            <Image
              source={{ uri: node.main_picture.medium }}
              style={tw`w-16 h-24 rounded-lg`}
            />
            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`text-lg font-semibold`}>{ranking.rank}. {node.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
