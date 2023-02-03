// Name: Ken Li Jia Jie

// Admission Number: P2227704

// Class: DIT/FT/1B/02
import * as React from 'react';

import { StyleSheet, Text, View, SectionList, TouchableOpacity, Modal, Button, Alert, Pressable } from 'react-native';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { setYear } from 'date-fns';


export default function CalendarScreen() {
  const [language, setLanguage] = React.useState(false)
  AsyncStorage.getItem("language")
    .then((value) => {
      setLanguage(value === 'true')
    })
    .catch((error) => {
      console.error(error)
    })
  const [tasks, setTasks] = React.useState([])

  

  async function getData() {
    await AsyncStorage.getItem("tasks")
      .then((data) => {
        if (data) {

          setTasks(JSON.parse(data))
        } else {
          setTasks([
            { title: 'MAD Assignment 2', dueDate: new Date('2023-01-13'), completed: false, selected: false, description: "", showInCalendar: true, showInTodo: true },
            { title: 'BED Assignment 1', dueDate: new Date('2023-01-03'), completed: true, selected: false, description: "", showInCalendar: true, showInTodo: true },
            { title: 'Home-Based Learning Packege', dueDate: new Date('2022-01-17'), completed: false, selected: false, description: "", showInCalendar: true, showInTodo: true },
            { title: 'Java Assignment 1', dueDate: new Date('2022-05-04'), completed: true, selected: false, description: "", showInCalendar: true, showInTodo: true },
          ])

        }

      })
      .catch(error => {
        Alert.alert(error.message)
      })
    let filteredEvents = tasks.filter(event => event.showInCalendar !== false);
    setdayEvents(filteredEvents)
  }



  // const [tasks, setTasks] = React.useState([
  //   { title: 'MAD Assignment 2', dueDate: new Date('2023-01-13'), completed: false, selected: false, description: "", showInCalendar: true, showInTodo: true },
  //   { title: 'BED Assignment 1', dueDate: new Date('2023-01-03'), completed: true, selected: false, description: "", showInCalendar: true, showInTodo: true },
  //   { title: 'Home-Based Learning Packege', dueDate: new Date('2023-01-17'), completed: false, selected: false, description: "", showInCalendar: true, showInTodo: true },
  //   { title: 'Java Assignment 1', dueDate: new Date('2023-01-02'), completed: true, selected: false, description: "", showInCalendar: true, showInTodo: true },
  // ]);

  const [refresh,setRefresh] = React.useState(false)
  const [dayEvents, setdayEvents] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [showDateModal, setShowDateModal] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [calendarDate, setCalendarDate] = React.useState(new Date().toISOString().substring(0, 10))

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => {
          setRefresh(!refresh)
        }}>
          <FontAwesome name="refresh" size={24} color="black" />
        </Pressable>
      )
    })
    getData()
    let filteredEvents = tasks.filter(event => event.showInCalendar !== false);
    setdayEvents(filteredEvents)

  }, [refresh])

  const resetMarkedDates = {};

  dayEvents.forEach(dayEvents => {
    markedDates[new Date(dayEvents.dueDate).toISOString().substring(0, 10)] = { marked: true };
  });

  function handleDayPress(day) {

    setSelectedDate(day.dateString);
    var updatedDayEvents = dayEvents.map(item => {
      if (new Date(item.dueDate).toISOString().substring(0, 10) == day.dateString) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    setdayEvents(updatedDayEvents);
    setSelectedEvents(updatedDayEvents.filter(dayEvents => dayEvents.selected == true));
    // update the selected date in markedDates
    var eventForSelectedDate = dayEvents.find(event => new Date(event.dueDate).toISOString().substring(0, 10) == day.dateString);
    if (eventForSelectedDate) {
      setMarkedDates({ ...resetMarkedDates, [day.dateString]: { marked: true, selected: true, selectedColor: 'red' } });
    } else {
      setMarkedDates({ ...resetMarkedDates, [day.dateString]: { selected: true, selectedColor: 'red' } });
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

  const handleCalendarPress = () => {
    setShowDateModal(true)

  }

  const handleCloseCallendarModal = () => {
    setShowDateModal(false)
    setSelectedYear(null)
    setSelectedMonth(null)
    setSelectedDay(null)
  }

  const years = Array.from({ length: 2032 - 2012 + 1 }, (a, i) => 2012 + i);

  const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from({ length: selectedMonth ? daysInMonth(selectedMonth, selectedYear) : 31 }, (a, i) => {
    const day = i + 1;
    return day < 10 ? `0${day}` : day;
  });
  const handleMonthValue = (month) => {
    if (month < 10) {
      month = "0" + month;
      return month;
    }
    return month;
  }

  const handleQuickNav = () => {
    setCalendarDate(selectedYear + "-" + handleMonthValue(selectedMonth) + "-" + selectedDay);
    console.log(calendarDate)
    setShowDateModal(false);
    setSelectedYear(null);
    setSelectedMonth(null);
    setSelectedDay(null);
  }


  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <Calendar style={{ width: 395 }}
          initialDate={calendarDate}

          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: 'red',
            selectedDayTextColor: 'white',
            dotColor: 'blue',
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


            }}><Text style={{ fontSize: 20 }} onPress={() => handleTaskClick(item)}>{item.title}</Text></View>}
            renderSectionHeader={() => <Text style={{ fontSize: 30, borderBottomWidth: 1 }}>{!language ? "Events for" : "今日活动："} {selectedDate}</Text>}
          />
        )}


      </View>
      <View style={{ alignSelf: 'flex-end', left: -8, top: -10 }}>
        <AntDesign name="calendar" size={55} color="black" onPress={handleCalendarPress} />
      </View>
      <Modal visible={showDateModal}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Quick Navigation</Text>
          <View style={{ padding: 10, paddingTop: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Year:</Text>
            <RNPickerSelect
              items={years.map(year => ({ label: year.toString(), value: year }))}
              onValueChange={value => setSelectedYear(value)}
              value={selectedYear}
            />

            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Month:</Text>
            <RNPickerSelect
              items={months}
              onValueChange={value => setSelectedMonth(value)}
              value={selectedMonth}
            />

            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Day:</Text>
            <RNPickerSelect
              items={days.map(day => ({ label: day.toString(), value: day }))}
              onValueChange={value => setSelectedDay(value)}
              value={selectedDay}
            />
            <Button title="Set!" onPress={handleQuickNav} />
            <Button title="Back" onPress={handleCloseCallendarModal} />
          </View>
        </View>
      </Modal>
      <View>
        <TouchableOpacity onPress={handleTimerPress}>
          <MaterialIcons
            style={{ alignSelf: 'flex-end', left: 170, margin: 10 }}
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
              {selectedTask && <Text style={styles.modalDueDate}>Due Date: {new Date(selectedTask.dueDate).toISOString().substring(0, 10)}</Text>}
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