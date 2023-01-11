import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Button, FlatList, SectionList, Modal } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons'; 


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function TodoScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
      <Text>Details Screen</Text>
      <AntDesign style = {{alignItems:'flex-end'}} name="pluscircle" size={24} color="black" 
          onPress={() => navigation.push('Details')}/>

    </View>
  );
}
const Stack = createNativeStackNavigator();


export default function TodoList() {
  const [tasks, setTasks] = React.useState([
    { title: 'MAD Assignment 2', dueDate: '2023-01-13', completed: false },
    { title: 'BED Assignment 1', dueDate: '2023-01-03', completed: true },
    { title: 'Home-Based Learning Packege', dueDate: '2022-01-17', completed: false },
    { title: 'Java Assignment 1', dueDate: '2022-05-04', completed: true },
  ]);

  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const getTimeLeft = () => {

  }


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

  return (
    <>

<NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Details" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
      <View style={{...styles.container2, /*backgroundColor:"#f9c2ff"*/ }}>
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
              <Text style={ styles.header} onPress={() => handleSectionPress(title)}>{title}</Text>
          </View>
      )}
        />
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
    width : 300,
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
}
};
