import * as React from 'react';
import { Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const language = props.language
  const [date, setDate] = React.useState(new Date());
  const profileName = props.name
  setTimeout(function () {
    setDate(new Date());
  }, 1000)
  var message = ""
  if (date.getHours() < 12) {
    message = !language ? "Good morning" : "早上好"
  } else if (date.getHours() < 18) {
    message = !language ? "Good Afternoon" : "下午好"
  } else {
    message = !language ? "Good Evening" : "晚上好"
  }
  return (<>
    <Text style={{ fontSize: 30 }}> {message}</Text>
    <Text style = {{fontSize:30}}>{profileName}</Text>
  </>
  )
}


export default function HomeScreen() {
  const [ProfileName, setProfileName] = React.useState("")
  const [language, setLanguage] = React.useState(false)
  AsyncStorage.getItem("language")
    .then((value) => {
      setLanguage(value === 'true')
    })
    .catch((error) => {
      console.error(error)
    })

  AsyncStorage.getItem("profileName")
    .then(value => {
      if (value) {
        setProfileName(value)
      }
    })
    .catch((error) => {
      console.error(error)
    })
  return (
    <>
      <View style={styles.container}>

        <Clock />
        <TimeMessage language={language} name={ProfileName} />


        <View style={styles.container2}>

          <Text>{"<"}{!language ? "Calendar event" : "日历节目"}{">"}</Text>
          <Text>{!language ? "You have no events scheduled" : "你今天没有节目"}</Text>
          <Text>{"\n\n\n\n"}</Text>

          <Text style={{ fontWeight: "bold" }}>------------------------------------------------------------</Text>
          <Text>{!language ? "Todo" : "待办"}</Text>
          <Text>{!language ? "All of your work is completed!" : "你所有的工作都完成了"}</Text>

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