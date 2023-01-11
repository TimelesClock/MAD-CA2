import * as React from 'react';
import { useState } from 'react';
import { Text, View, Button, FlatList, SectionList, Modal } from 'react-native';
import Constants from 'expo-constants';


const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);


export default function TodoList() {
    const [tasks, setTasks] = React.useState([
        { title: 'Task 1', dueDate: '2022-05-01', completed: false },
        { title: 'Task 2', dueDate: '2022-05-02', completed: true },
        { title: 'Task 3', dueDate: '2022-05-03', completed: false },
        { title: 'Task 4', dueDate: '2022-05-04', completed: true },
    ]);

    const [selectedTask, setSelectedTask] = React.useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
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


<View>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View>
            <Text onPress={() => handleTaskClick(item)}>
              {item.title} - {item.dueDate}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        )}
      />
      {selectedTask && (
        <View>
          <Text>{selectedTask.title}</Text>
          <Text>Due Date: {selectedTask.dueDate}</Text>
          <Text onPress={handleCloseModal}>Close</Text>
        </View>
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
        paddingTop: Constants.statusBarHeight,
        padding: 8,
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
        padding: 20,
        marginVertical: 8,

    },
    header: {
        fontSize: 10,
        fontWeight: "bold",


    },
    title: {
        backgroundColor: "#f9c2ff",
        fontSize: 24
    }
};
