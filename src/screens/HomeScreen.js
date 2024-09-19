import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import fetchWithToken from './../api/malApiClient';
import { getCurrentYearAndSeason } from './../config';

const HomeScreen = () => {
  const [mostWatched, setMostWatched] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { year, season } = getCurrentYearAndSeason();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mostWatchedData = await fetchWithToken('/anime/ranking?ranking_type=bypopularity&limit=20');
        setMostWatched(mostWatchedData.data || []);

        const rankingData = await fetchWithToken('/anime/ranking?limit=20');
        setTopRated(rankingData.data || []);

        const movieData = await fetchWithToken('/anime/ranking?ranking_type=movie&limit=20');
        setTopMovies(movieData.data || []);

        const seasonalData = await fetchWithToken(`/anime/ranking?ranking_type=airing&limit=20`);
        setSeasonalAnime(seasonalData.data || []);

        const suggestionsData = await fetchWithToken('/anime/suggestions?limit=20');
        setSuggestions(suggestionsData.data || []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  const renderAnimeCard = ({ item }) => (
    <View style={tw`w-28 px-2 py-1 mr-3`}>
      <TouchableOpacity onPress={() => navigation.navigate('AnimeScreen', { animeId: item.node.id, animeTitle: item.node.title })}>

        <Image
          source={{ uri: item.node.main_picture.medium }}
          style={tw`w-24 h-36 rounded-lg`}
        />
        <Text style={tw`mt-1 text-xs font-semibold text-center`} numberOfLines={2}>{item.node.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHorizontalList = (title, data) => (
    <View style={tw`px-4`}>
      <Text style={tw`text-xl font-bold mb-2 mt-2`}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderAnimeCard}
        keyExtractor={(item) => item.node.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={tw`text-lg text-gray-600 mt-2`}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-50`} contentContainerStyle={tw`pb-25 pt-3`} showsVerticalScrollIndicator={false}>
      {renderHorizontalList(`${season} ${year}`, seasonalAnime)}
      {renderHorizontalList('Most Watched', mostWatched)}
      {renderHorizontalList('Top Rated', topRated)}
      {renderHorizontalList('Top Movies', topMovies)}
      {renderHorizontalList('Suggestions', suggestions)}
    </ScrollView>
  );
};

export default HomeScreen;
