import * as React from 'react';
import { Text, View, Button } from 'react-native';
import Constants from 'expo-constants';






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

  return <Text style={styles.time}> {date.getHours() + ':' + date.getMinutes()}</Text>;
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
  return <Text > {message}</Text>
}

export default function App() {
  return (
    <View style={styles.container}>
      <Clock />
      <TimeMessage />
    </View>
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
  time: {
    fontWeight: "bold",
    fontSize: 60
  }
};
