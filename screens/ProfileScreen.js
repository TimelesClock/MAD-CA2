import * as React from 'react';
import { Text, View, Button, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function ProfileScreen() {
    return (
        <>
            <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 2 }}>
                <Ionicons style={{ flex: 1 }} name="person-circle-outline" size={75} color="black" />
                <View style={{ flex: 2, paddingTop: Constants.statusBarHeight }}>
                    <Text style = {{marginLeft:8}}>You are not logged in!</Text>
                    <Pressable style={styles.button}>
                        <Text style={{ fontWeight: "bold" }}>Login</Text>
                    </Pressable>
                </View>

            </View>
            <View style={{ flex: 5}}>
                <Text style = {{fontWeight:"bold",fontSize:30,paddingBottom:40,paddingLeft:20}}>Settings</Text>
                <View style = {{paddingLeft:40}}>
                    <Text style = {{fontWeight:"bold",fontSize:20}}>Theme</Text>
                    <View style = {{flexDirection:"row"}}>

                    </View>
                </View>
            </View>


        </>
    )
}







var styles = {
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        overflow:"hidden",
        paddingVertical: 4,
        borderWidth: 1,
        backgroundColor: "#D9D9D9",
        width:150
    }
    ,
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