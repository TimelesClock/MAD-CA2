import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Button, TextInput, SectionList, Modal, DateTimePicker} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);





export default function TodoList() {
  const [tasks, setTasks] = React.useState([
    { title: 'MAD Assignment 2', dueDate: '2023-01-13', completed: false },
    { title: 'BED Assignment 1', dueDate: '2023-01-03', completed: true },
    { title: 'Home-Based Learning Packege', dueDate: '2022-01-17', completed: false },
    { title: 'Java Assignment 1', dueDate: '2022-05-04', completed: true },
  ]);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskDueDate, setTaskDueDate] = React.useState("");
  const [selectedTask, setSelectedTask] = React.useState(null);

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
      title: 'Completed Tasks',
      data: tasks.filter((task) => task.completed),
    },
    {
      title: 'Incomplete Tasks',
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

      <View style={{ ...styles.container2, /*backgroundColor:"#f9c2ff"*/ }}>
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
            <AntDesign name="closecircle" size={24} color="black" onPress={() => setModalVisible(false)}/>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Task Title"
                onChangeText={text => setTaskTitle(text)}
                value={taskTitle}
              />
              <TextInput
                style={{...styles.input, minHeight: 100}}
                placeholder="Task Description"
                onChangeText={text => setTaskDescription(text)}
                value={taskDescription}
              />
              <TextInput
                style={styles.input}
                placeholder="Due Date"
                onChangeText={text => setTaskDueDate(text)}
                value={taskDueDate}
              />
              <View>
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
    width: 400
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
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 4,
    fontSize: 20,
    borderRadius: 20,


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
    borderRadius:10,
    borderColor: 'gray',

  },
  buttonContainer: {
    alignSelf:"flex-start",
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
