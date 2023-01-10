import * as React from 'react';
import { Text, View, Button, FlatList, SectionList } from 'react-native';
import Constants from 'expo-constants';

const TaskList = [
    {
        title: "Incomplete Tasks",
        data: ["a", "b", "c"]
    },
    {
        title: "Completed Task",
        data: ["a", "b", "c"]
    },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);


export default function TodoList() {
    return (
        <>


            <View style={styles.container2}>

                <Text>Todo List</Text>
                <Text>{"\n\n\n\n"}</Text>
                <SectionList
                    sections={TaskList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.container3}>
                        <Text style={styles.header}>{title}</Text>
                        </View>
                    )}/>
                <Text>-----------------------</Text>
                <Text>Todo</Text>
                <Text>All of your work is completed!</Text>

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
        fontWeight:"bold",
        
    },
    title: {
        backgroundColor: "#f9c2ff",
        fontSize: 24
    }
};
