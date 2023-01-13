import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalendarScreen() {

  const [language, setLanguage] = React.useState(false)
  AsyncStorage.getItem("language")
    .then((value) => {
      setLanguage(value === 'true')
    })
    .catch((error) => {
      console.error(error)
    })

    
  const [dayEvents, setdayEvents] = React.useState([
    { title: 'MAD Assignment 2', Date: '2023-01-13', completed: false, selected: false },
    { title: 'BED Assignment 1', Date: '2023-01-03', completed: true, selected: false },
    { title: 'Home-Based Learning Packege', Date: '2023-01-17', caompleted: false, selected: false },
    { title: 'Java Assignment 1', Date: '2023-01-02', completed: true, selected: false },
]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  


  const resetMarkedDates = {};
  dayEvents.forEach(dayEvents => {
    markedDates[dayEvents.Date] = { marked: true};
  });

  function handleDayPress(day) {
    setSelectedDate(day.dateString);
    var updatedDayEvents = dayEvents.map(item => {
        if (item.Date == day.dateString) {
            item.selected = true;
        } else {
            item.selected = false;
        }
        return item;
    });
    setdayEvents(updatedDayEvents);
    setSelectedEvents(updatedDayEvents.filter(dayEvents => dayEvents.selected == true));
    // update the selected date in markedDates
    var eventForSelectedDate = dayEvents.find(event => event.Date == day.dateString);
    if(eventForSelectedDate) {
        setMarkedDates({...resetMarkedDates, [day.dateString]: { marked: true, selected: true, selectedColor: 'red'  }});
    } else {
        setMarkedDates({...resetMarkedDates, [day.dateString]: { selected: true, selectedColor: 'red' }});
    }
}

const navigation = useNavigation();

  function handleTimerPress() {
    navigation.navigate('Timer');
  }

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#FFFFFF'}}>
        <Calendar style={{ width: 395 }}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
              selectedDayBackgroundColor: 'red',
              selectedDayTextColor: 'white',
              dotColor:'blue',
          }}
          />

      </View>
      <View style={{ flex: 1 }}>
        {selectedEvents.length > 0 && (
          <SectionList
            sections={[{ data: selectedEvents }]}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <View style={{
              backgroundColor: "#FFAAAA",
              padding: 10,
              paddingVertical: 20,
              marginVertical: 4,
              borderRadius: 20,
              width: '90%'
          
          
            }}><Text style={{fontSize: 20}}>{item.title}</Text></View>}
            renderSectionHeader={() => <Text style= {{fontSize:30, borderBottomWidth:1}}>{!language ? "Events for" : "今日活动："} {selectedDate}</Text>}
          />
        )}
      
        
      </View>
      <View>
      <TouchableOpacity onPress={handleTimerPress}>
        <MaterialIcons 
          style={{ alignSelf: 'flex-end', left: 170, margin: 10}} 
          name="timer" 
          size={60} 
          color="black" 
        />
      </TouchableOpacity>
    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
});