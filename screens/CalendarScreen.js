// Name: Ken Li Jia Jie

// Admission Number: P2227704

// Class: DIT/FT/1B/02
import * as React from 'react';

import { StyleSheet, Text, View, SectionList, TouchableOpacity, Modal, Button} from 'react-native';
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
    { title: 'MAD Assignment 2', dueDate: new Date('2023-01-13'), completed: false, selected: false, description:"", showInCalendar: true, showInTodo: true },
    { title: 'BED Assignment 1', dueDate: new Date('2023-01-03'), completed: true, selected: false, description:"", showInCalendar: true, showInTodo: true },
    { title: 'Home-Based Learning Packege', dueDate: new Date('2023-01-17'), caompleted: false, selected: false, description:"", showInCalendar: true, showInTodo: true },
    { title: 'Java Assignment 1', dueDate: new Date('2023-01-02'), completed: true, selected: false, description:"", showInCalendar: true, showInTodo: true },
]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedTask, setSelectedTask] = React.useState(null);
  


  const resetMarkedDates = {};
  dayEvents.forEach(dayEvents => {
    markedDates[dayEvents.dueDate.toISOString().substring(0, 10)] = { marked: true };
  });

  function handleDayPress(day) {
    setSelectedDate(day.dateString);
    var updatedDayEvents = dayEvents.map(item => {
        if (item.dueDate.toISOString().substring(0, 10) == day.dateString) {
            item.selected = true;
        } else {
            item.selected = false;
        }
        return item;
    });
    setdayEvents(updatedDayEvents);
    setSelectedEvents(updatedDayEvents.filter(dayEvents => dayEvents.selected == true));
    // update the selected date in markedDates
    var eventForSelectedDate = dayEvents.find(event => event.dueDate.toISOString().substring(0, 10) == day.dateString);
    if(eventForSelectedDate) {
        setMarkedDates({...resetMarkedDates, [day.dateString]: { marked: true, selected: true, selectedColor: 'red'  }});
    } else {
        setMarkedDates({...resetMarkedDates, [day.dateString]: { selected: true, selectedColor: 'red' }});
    }
}


const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

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
        {(
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
          
          
            }}><Text style={{fontSize: 20}} onPress={() => handleTaskClick(item)}>{item.title}</Text></View>}
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
    {selectedTask && (
          <Modal visible={!!selectedTask} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedTask && <Text style={styles.modalTitle}>{selectedTask.title}</Text>}
                {selectedTask && <Text style={styles.modalDueDate}>Due Date: {selectedTask.dueDate.toISOString().substring(0, 10)}</Text>}
                <Button title="Close" onPress={handleCloseModal} />
              </View>
            </View>
          </Modal>
        )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    alignSelf: "center",
    borderRadius: 10,
    width: '80%',
    maxWidth: 400
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  modalDueDate: {
    fontSize: 18,
    marginBottom: 20
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContentAdd: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: ''
  }
});