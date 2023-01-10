import * as React from 'react';
import { Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

class Li extends React.Component {
  render() {
    if (this.props.emoji == undefined) {
      return <Text>{'•' + this.props.text}</Text>;
    }
    return <Text>{'•' + this.props.emoji + this.props.text}</Text>;
  }
}

// function Li2 (props){
//     return <Text>{props.emoji}  {props.text}</Text>
// }

const Clock = function (props) {

  const [date, setDate] = React.useState(new Date());
  setTimeout(function () {
    setDate(new Date());
  }, 1000)

  return <Text style={styles.time}> {date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}</Text>;
}

const TimeMessage = function (props) {
  const [date, setDate] = React.useState(new Date());
  setTimeout(function () {
    setDate(new Date());
  }, 1000)
  var message = ""
  if (date.getHours() < 12) {
    message = "Good Morning"
  } else if (date.getHours() < 18) {
    message = "Good Afternoon"
  } else {
    message = "Good Evening"
  }
  return <Text style={{ fontSize: 30 }}> {message}</Text>
}

async function GetEvents() {






}

async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!

      return value
    } else {
      return null
    }
  } catch (error) {
    // Error retrieving data
  }
}


export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>

        <Clock />
        <TimeMessage />


        <View style={styles.container2}>

          <Text>{"<"}Calendar event{">"}</Text>
          <Text>You have no events scheduled</Text>
          <Text>{"\n\n\n\n"}</Text>

          <Text>-----------------------</Text>
          <Text>Todo</Text>
          <Text>All of your work is completed!</Text>

        </View>
      </View>

    </>
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