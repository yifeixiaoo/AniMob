import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AnimeScreen from "../screens/AnimeScreen"; // Import AnimeScreen
import { HeaderTitle } from "../config";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 30,
          height: 60,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#D1D5DB",
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: HeaderTitle,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="home"
              color={color}
              size={size}
              style={{ marginBottom: -2 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: HeaderTitle,
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="search"
              color={color}
              size={size}
              style={{ marginBottom: -4 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const NavBar = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnimeScreen"
        component={AnimeScreen}
        options={({ route }) => ({
          headerTitle: route.params?.animeTitle || "Anime Details",
          headerBackTitle: "Back",
        })}
      />
    </Stack.Navigator>
  );
};

export default NavBar;
