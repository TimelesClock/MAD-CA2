import * as React from 'react';
import { Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { Foundation, Ionicons,FontAwesome,AntDesign,FontAwesome5  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen'







const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            // You can return any component that you like here!
            return <Text style={{ color: color }}>{focused ? "🙉" : "🙈"}</Text>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Notes" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5 name="sticky-note" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name="Calendar" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign name="calendar" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="home" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name="Todo" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Foundation name="clipboard-notes" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name="Profile" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome name="user-circle" size={24} color="black" />
            );
          },
        }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

var styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,

  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  time: {
    paddingTop: Constants.statusBarHeight,
    fontWeight: "bold",
    fontSize: 80
  }
};
