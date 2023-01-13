// Name: Ken Li Jia Jie

// Admission Number: P2227704

// Class: DIT/FT/1B/02

import * as React from 'react';
import { Text, View, Button, TextInput, SectionList, Modal, DateTimePicker, Switch } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function TodoList() {

  const [language, setLanguage] = React.useState(false)
  AsyncStorage.getItem("language")
    .then((value) => {
      setLanguage(value === 'true')
    })
    .catch((error) => {
      console.error(error)
    })

  const [tasks, setTasks] = React.useState([
    { title: 'MAD Assignment 2', dueDate: '2023-01-13', completed: false },
    { title: 'BED Assignment 1', dueDate: '2023-01-03', completed: true },
    { title: 'Home-Based Learning Packege', dueDate: '2022-01-17', completed: false },
    { title: 'Java Assignment 1', dueDate: '2022-05-04', completed: true },
  ]);


  const [searchTask, setSearchTask] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskDueDate, setTaskDueDate] = React.useState("");
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };


  const [hiddenSections, setHiddenSections] = React.useState({});

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
    setModalVisible(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate();
  }

  return (
    <>

      <View style={{ ...styles.container2 }}>
        <View style={{flexDirection:'row', borderBottomWidth:1, marginBottom: 10, paddingBottom:10,borderColor:'grey'}}>
          <AntDesign style={{top:10 }} name="search1" size={30} color="black" />
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
            if (!hiddenSections[section.title]) {
              return (
                <View>
                  <Text style={styles.item} onPress={() => handleTaskClick(item)}>
                    {item.title}  {item.dueDate}
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
              <TextInput
                style={styles.input}
                placeholder={!language ? "Due Date" : "截止日期"}
                onChangeText={text => setTaskDueDate(text)}
                value={taskDueDate}
              />
              <View style={{ flexDirection: "row", justifyContent: 'space-between', width: 250, paddingVertical: 10, borderTopColor: 'grey', borderTopWidth: 1, }}>
                <Text style={{ justifyContent: 'flex-start', fontSize: 20 }}>{!language ? "Reminder" : "提醒"}</Text>
                <View style={{ maxWidth: "40%", flexDirection: "row", alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: "grey" }}>{!language ? "Two Days Before" : "两天前"}</Text>
                  <AntDesign name="right" size={24} color="black" />
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
                <Text style={{ ...styles.buttonSubmit, fontWeight: "bold", color: "black", textAlign: 'center' }} onPress={() => setModalVisible(false)}>Submit</Text>

              </View>
            </View>
          </View>
        </Modal>
        {selectedTask && (
          <Modal visible={!!selectedTask} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedTask && <Text style={styles.modalTitle}>{selectedTask.title}</Text>}
                {selectedTask && <Text style={styles.modalDueDate}>Due Date: {selectedTask.dueDate}</Text>}
                <Button title="Close" onPress={handleCloseModal} />
              </View>
            </View>
          </Modal>
        )}
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
    width: '90%'


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
    alignSelf: "flex-start",
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
