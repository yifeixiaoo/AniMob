import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Modal, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import fetchWithToken from './../api/malApiClient';
import { formatString } from '../utils';

const AnimeScreen = ({ route }) => {
    const { animeId } = route.params;
    const [animeDetails, setAnimeDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const data = await fetchWithToken(`/anime/${animeId}?fields=num_episodes, genres, synopsis, status, start_season, mean, media_type, studio, source, alternative_titles`);
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

    const { alternative_titles } = animeDetails || {};

    return (
        <ScrollView style={tw`flex-1 bg-gray-50 p-4`}>
            {animeDetails && (
                <>
                    {/* Main Picture */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={{ uri: animeDetails.main_picture.large }}
                            style={tw`w-full h-70 rounded-lg`}
                        />
                    </TouchableOpacity>

                    {/* Genres Section */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`my-4`}>
                        {animeDetails.genres && animeDetails.genres.map((genre, index) => (
                            <View key={index} style={tw`bg-blue-200 rounded-full px-3 py-1 mr-2`}>
                                <Text style={tw`text-base font-semibold text-blue-800`}>{formatString(genre.name)}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={tw`bg-gray-100 rounded-lg p-4 mb-4`}>
                        {/* Left-Right Fields and Details */}
                        <View style={tw`flex-row justify-between items-start`}>
                            {/* Left side: Fields */}
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-base font-semibold text-gray-600 mb-1`}>Season:</Text>
                                <Text style={tw`text-base font-semibold text-gray-600 mb-1`}>Episodes:</Text>
                                <Text style={tw`text-base font-semibold text-gray-600 mb-1`}>Status:</Text>
                                <Text style={tw`text-base font-semibold text-gray-600 mb-1`}>MAL Score:</Text>
                                <Text style={tw`text-base font-semibold text-gray-600 mb-1`}>Type:</Text>
                                <Text style={tw`text-base font-semibold text-gray-600 mb-1`}>Source:</Text>
                            </View>

                            {/* Right side: Details */}
                            <View style={tw`flex-1 items-end`}>
                                <Text
                                    style={tw`text-base text-gray-800 mb-1`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {formatString(animeDetails.start_season.season + " " + animeDetails.start_season.year) || 'N/A'}
                                </Text>
                                <Text
                                    style={tw`text-base text-gray-800 mb-1`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {animeDetails.num_episodes || 'N/A'}
                                </Text>
                                <Text
                                    style={tw`text-base text-gray-800 mb-1`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {formatString(animeDetails.status) || 'N/A'}
                                </Text>
                                <Text
                                    style={tw`text-base text-gray-800 mb-1`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {animeDetails.mean || 'N/A'}
                                </Text>
                                <Text
                                    style={tw`text-base text-gray-800 mb-1`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {formatString(animeDetails.media_type) || 'N/A'}
                                </Text>
                                <Text
                                    style={tw`text-base text-gray-800 mb-1`}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {formatString(animeDetails.source) || 'N/A'}
                                </Text>
                            </View>
                        </View>

                        {/* Alternative Titles Section */}



                        <View style={tw`mt-4`}>
                            <Text style={tw`text-base font-semibold text-gray-600 mb-4`}>Synonyms:</Text>
                            {alternative_titles && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw``}>
                                {alternative_titles.synonyms?.map((synonym, index) => (
                                    <View key={index} style={tw`bg-green-200 rounded-full px-3 py-1 mr-2`}>
                                        <Text style={tw`text-base font-semibold text-green-800`}>{formatString(synonym)}</Text>
                                    </View>
                                ))}
                                {alternative_titles.en && (
                                    <View style={tw`bg-red-200 rounded-full px-3 py-1 mr-2`}>
                                        <Text style={tw`text-base font-semibold text-red-800`}>{formatString(alternative_titles.en)}</Text>
                                    </View>
                                )}
                                {alternative_titles.ja && (
                                    <View style={tw`bg-purple-200 rounded-full px-3 py-1 mr-2`}>
                                        <Text style={tw`text-base font-semibold text-purple-800`}>{alternative_titles.ja}</Text>
                                    </View>
                                )}
                            </ScrollView>
                        )}
                        </View>
                        

                        {/* Description Section */}
                        <View style={tw`mt-4`}>
                            <Text style={tw`text-base font-semibold text-gray-600 mb-2`}>Description:</Text>
                            <Text style={tw`text-base text-gray-800`}>
                                {animeDetails.synopsis || 'N/A'}
                            </Text>
                        </View>
                    </View>

                    {/* Full-Screen Image Modal */}
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableOpacity
                            style={tw`flex-1 justify-center items-center bg-black bg-opacity-80`}
                            onPress={() => setModalVisible(false)}
                        >
                            <Image
                                source={{ uri: animeDetails.main_picture.large }}
                                style={tw`w-full h-full`}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </Modal>
                </>
            )}
        </ScrollView>
    );
};

export default AnimeScreen;
