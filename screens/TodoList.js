// Name: Ken Li Jia Jie

// Admission Number: P2227704

// Class: DIT/FT/1B/02
import * as React from 'react';
import { Text, View, Button, TextInput, SectionList, Modal, Switch, Alert } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';



export default function TodoList(props) {
  const rerender = props.rerender
  const [language, setLanguage] = React.useState(false)
  AsyncStorage.getItem("language")
    .then((value) => {
      setLanguage(value === 'true')
    })
    .catch((error) => {
      console.error(error)
    })


  const [tasks, setTasks] = React.useState([])


  async function getData(){
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
    })}

  // const [tasks, setTasks] = React.useState([
  //   { title: 'MAD Assignment 2', dueDate: new Date('2023-01-13'), completed: false, selected: false, description: "", showInCalendar: true, showInTodo: true },
  //   { title: 'BED Assignment 1', dueDate: new Date('2023-01-03'), completed: true, selected: false, description: "", showInCalendar: true, showInTodo: true },
  //   { title: 'Home-Based Learning Packege', dueDate: new Date('2022-01-17'), completed: false, selected: false, description: "", showInCalendar: true, showInTodo: true },
  //   { title: 'Java Assignment 1', dueDate: new Date('2022-05-04'), completed: true, selected: false, description: "", showInCalendar: true, showInTodo: true },
  // ]);
  React.useEffect(()=>{
    getData()
  },[])
  

  const [searchTask, setSearchTask] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskDueDate, setTaskDueDate] = React.useState("");
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [completeIsEnabled, setCompleteIsEnabled] = React.useState(false);
  const toggleCompletedSwitch = () => setCompleteIsEnabled(previousState => !previousState);
  const [date, setDate] = React.useState(new Date());
  const [hiddenSections, setHiddenSections] = React.useState({});
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth()+1);
  const [selectedDay, setSelectedDay] = React.useState(new Date().getDate());



  const years = Array.from({ length: 2032 - 2012 + 1 }, (a, i) => 2012 + i);

  const months = [
    { label: !language ? "January" : "一月", value: 1 },
    { label: !language ? 'February' : "二月", value: 2 },
    { label: !language ? 'March' : "三月", value: 3 },
    { label: !language ? "April" : "四月", value: 4 },
    { label: !language ? "May" : "五月", value: 5 },
    { label: !language ? "June" : "六月", value: 6 },
    { label: !language ? "July" : "七月", value: 7 },
    { label: !language ? "August" : "八月", value: 8 },
    { label: !language ? "September" : "九月", value: 9 },
    { label: !language ? "October" : "十月", value: 10 },
    { label: !language ? "November" : "十一月", value: 11 },
    { label: !language ? "December" : "十二月", value: 12 },
  ];



  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };


  const handleSectionPress = (title) => {
    setHiddenSections({
      ...hiddenSections,
      [title]: !hiddenSections[title]
    });
  };

  const sections = [
    {
      title: !language ? "Complete" : "已完成",
      data: tasks.filter((task) => task.completed),
    },
    {
      title: !language ? "Incomplete" : "未完成",
      data: tasks.filter((task) => !task.completed),
    },
  ];

  const handleSubmit = () => {
    // console.log(selectedDay,selectedMonth,selectedYear)
    // setTaskDueDate(selectedYear + "-" + handleMonthValue(selectedMonth) + "-" + selectedDay);
    // console.log(taskDueDate)


    const newTask = { title: taskTitle, dueDate: new Date(selectedYear,selectedMonth-1,selectedDay), completed: false, selected: false, description: taskDescription, showInCalendar: isEnabled, showInTodo: true };
    let temp = tasks
    temp.push(newTask)
    setTasks(temp);

    setTaskDescription('');
    setTaskTitle('');
    setIsEnabled(false)
    setModalVisible(false);
    storeData();
    getData()
  };

  const handleDatePick = () => {
    setDatePickerVisible(true)
  }

  const datePickerSubmit = () => {
    setDatePickerVisible(false)
  }

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




  const storeData = async () => {
    try {
      const stringifiedTasks = JSON.stringify(tasks);

      await AsyncStorage.setItem('tasks', stringifiedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task !== taskToDelete));
    handleCloseModal();
    storeData();
  };

  const handleCompletemark = () => {
    toggleCompleted(findIndex(selectedTask))
  }

  const findIndex = (selectedTask) => {
    const index = tasks.findIndex((task) => task.title === selectedTask.title);
    return index;
  }
  function toggleCompleted(index) {
    toggleCompletedSwitch()
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      newTasks[index].completed = !newTasks[index].completed;
      return newTasks;
    });
  }

  return (
    <>

      <View style={{ ...styles.container2 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10, borderColor: 'grey' }}>
          <AntDesign style={{ top: 10 }} name="search1" size={30} color="black" />
          <TextInput
            style={{ backgroundColor: "#D7D7D7", width: '95%', height: 50, paddingLeft: 30, borderRadius: 30 }}
            placeholder={!language ? "Search" : "搜索"}
            onChangeText={text => setSearchTask(text)}
            value={searchTask}
          />
        </View>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section }) => {
            if (!hiddenSections[section.title] && item.title.toLowerCase().includes(searchTask.toLowerCase())) {
              return (
                <View>

                  <Text style={styles.item} onPress={() => handleTaskClick(item)}>
                    {item.title}     {new Date(item.dueDate).toLocaleDateString()}
                  </Text>
                </View>
              );
            } else {
              return null;
            }
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <Text style={styles.header} onPress={() => handleSectionPress(title)}>{title}</Text>
            </View>
          )}
        />
        <View style={{ alignSelf: 'flex-end', position: 'absolute', top: 600, right: 10 }}>
          <AntDesign name="pluscircle" size={60} color="black"
            onPress={() => setModalVisible(true)} />
        </View>
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentAdd}>
              <View style={styles.buttonContainer}>
                <AntDesign name="closecircle" size={24} color="black" onPress={() => setModalVisible(false)} />
              </View>
              <TextInput
                style={styles.input}
                placeholder={!language ? "Task Title" : "任务标题"}
                onChangeText={text => setTaskTitle(text)}
                value={taskTitle}
              />
              <TextInput
                style={{ ...styles.input, minHeight: 100 }}
                placeholder={!language ? "Task Description" : "任务简介"}
                onChangeText={text => setTaskDescription(text)}
                value={taskDescription}
              />
              <View style={{ flexDirection: "row", justifyContent: 'space-between', width: 250, paddingVertical: 10, }}>
                <Text style={{ justifyContent: 'flex-start', fontSize: 20 }}>{!language ? "Due date" : "截止日期"}</Text>
                <View style={{ maxWidth: "40%", flexDirection: "row", alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: "grey" }}>{selectedYear ? selectedYear : "-"}-{selectedMonth ? handleMonthValue(selectedMonth) : "-"}-{selectedDay ? selectedDay : "-"}</Text>
                  <AntDesign name="right" size={24} color="black" onPress={handleDatePick} />
                </View>
              </View>
              
              <View style={{ flexDirection: "row", justifyContent: 'space-between', width: 250, paddingVertical: 10, borderTopColor: 'grey', borderTopWidth: 1 }}>
                <Text style={{ fontSize: 20 }}>{!language ? "Sync to Calendar" : "同步至日历"}</Text>
                <Switch
                  style={{ bottom: 12 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ ...styles.buttonSubmit, fontWeight: "bold", color: "black", textAlign: 'center' }} onPress={handleSubmit}>{!language ? "Submit" : "确认"}</Text>

              </View>
            </View>
          </View>
        </Modal>
        {selectedTask && (
          <Modal visible={!!selectedTask} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>

                {selectedTask && <Text style={styles.modalTitle}>{selectedTask.title}</Text>}
                {selectedTask && <Text style={styles.modalDueDate}>{!language ? "Due Date: " : "截止日期： "}{new Date(selectedTask.dueDate).toLocaleDateString()}</Text>}
                {selectedTask && <Text style={styles.modalDueDate}>{!language ? "Description: " : "简介： "}{selectedTask.description ? selectedTask.description : !language ? "No Description" : "无简介"}</Text>}
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: 250 }}>
                  <Text style={{ fontSize: 18 }}>{!language ? "Mark as completed" : "记录为已完成"}</Text>
                  <Switch
                    style={{ bottom: 12 }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={handleCompletemark}
                    value={selectedTask.completed}
                  />
                </View>
                <View style={{ ...styles.buttonContainer, flexDirection: "row", justifyContent: 'space-between' }}>
                  <Button title={!language ? "Close" : "关闭"} onPress={handleCloseModal} />
                  <Button title={!language ? "Delete:" : "删除"} onPress={() => handleDeleteTask(selectedTask)} color="red" />

                </View>
              </View>
            </View>
          </Modal>
        )}
        <Modal
          visible={datePickerVisible}
          animationType="fade"
          transparent={true}
        >
          <View style={{ ...styles.modalContainer }}>
            <View style={{ ...styles.modalContent }}>

              <View style={{ padding: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>{!language ? "Year:" : "年："}</Text>
                <RNPickerSelect
                  items={years.map(year => ({ label: year.toString(), value: year }))}
                  onValueChange={value => setSelectedYear(value)}
                  value={selectedYear}
                />

                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>{!language ? "Month:" : "月："}</Text>
                <RNPickerSelect
                  items={months}
                  onValueChange={value => setSelectedMonth(value)}
                  value={selectedMonth}
                />

                <Text style={{ fontWeight: 'bold', marginTop: 20 }}>{!language ? "Day:" : "日："}</Text>
                <RNPickerSelect
                  items={days.map(day => ({ label: day.toString(), value: day }))}
                  onValueChange={value => setSelectedDay(value)}
                  value={selectedDay}
                />
              </View>
              <View style={{ paddingTop: 10, alignSelf: "center" }}>
                <Text style={{ ...styles.buttonSubmit, fontWeight: "bold", color: "black", textAlign: 'center' }} onPress={datePickerSubmit}>{!language ? "Submit" : "确认"}</Text>

              </View>
            </View>
          </View>
        </Modal>
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
    alignSelf: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    width: '95%'
  },
  container3: {
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingRight: 200,
  },
  time: {
    paddingTop: Constants.statusBarHeight,
    fontWeight: "bold",
    fontSize: 80
  },
  item: {
    backgroundColor: "#FFAAAA",
    padding: 10,
    paddingVertical: 20,
    marginVertical: 4,
    fontSize: 20,
    borderRadius: 20,
    width: 340


  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    width: 300,
    textAlign: "left"


  },
  title: {
    backgroundColor: "#f9c2ff",
    fontSize: 24
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
  },
  input: {
    textAlignVertical: 'top',
    width: 250,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',

  },
  buttonContainer: {
    alignSelf: "center",
    width: 250

  },
  buttonSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: "hidden",
    paddingVertical: 6,
    borderWidth: 1,
    backgroundColor: "#D9D9D9",
    width: 150
  }
};
