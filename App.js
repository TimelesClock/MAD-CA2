// Name: Leong Yu Zhi Andy

// Admission Number: P2205865

// Class: DIT/FT/1B/02

import * as React from 'react';
import { Text } from 'react-native';
import Constants from 'expo-constants';
import { Foundation, Ionicons, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import HomeScreen from './screens/HomeScreen'


import ProfileScreen from './screens/ProfileScreen'
import TodoList from "./screens/TodoList"
import NoteScreen from "./screens/NoteScreen"
import CalendarScreens from "./screens/CalendarScreen"
import TimerScreens from "./screens/Timer"

import 'react-native-url-polyfill/auto'
import {supabase} from './supabase'



const Tab = createBottomTabNavigator();

export default function App() {
  
  const [language, setLanguage] = React.useState(false)
  AsyncStorage.getItem("language")
    .then((value) => {
      setLanguage(value === 'true')
    })
    .catch((error) => {
      console.error(error)
    })

  return (
    <NavigationContainer>
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            // You can return any component that you like here!
            return <Text style={{ color: color }}></Text>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        initialRouteName={!language ? "Home" : "主页"}
      >
        <Tab.Screen name={!language ? "Home" : "主页"} component = {HomeScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons name="home" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name={!language ? "Todo" : "待办"} children = {()=><TodoList rerender = {()=>{setLanguage(!language)}} />} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Foundation name="clipboard-notes" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name={!language ? "Notes" : "笔记"} component = {NoteScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome5 name="sticky-note" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name={!language ? "Calendar" : "日历"} component={CalendarScreens} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign name="calendar" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name={!language ? "Timer" : "计时器"} component={TimerScreens} options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons name="timer" size={24} color="black" />
            );
          },
        }} />
        <Tab.Screen name={!language ? "Profile" : "资料"} children={() => <ProfileScreen rerender={(navigation) => {
          setLanguage(!language)

        }} />} options={{
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
