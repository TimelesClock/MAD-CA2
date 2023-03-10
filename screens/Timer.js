// Name: Ken Li Jia Jie

// Admission Number: P2227704

// Class: DIT/FT/1B/02
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CountdownTimer() {
    const [language, setLanguage] = React.useState(false)
    AsyncStorage.getItem("language")
        .then((value) => {
            setLanguage(value === 'true')
        })
        .catch((error) => {
            console.error(error)
        })

    const [time, setTime] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    var timer
    React.useEffect(() => {

        if (time > 0 && isRunning) {
            timer = setTimeout(() => {
                setTime(time => time - 1);
            }, 1000);
        } else if (isRunning && time <= 0) {
            Alert.alert('Timer', 'Timer is up!')
            clearTimeout(timer)
            setIsRunning(false)
        }

        else {
            clearTimeout(timer);
        }
        return () => {
            clearTimeout(timer)
        };
    }, [isRunning, hours, minutes, seconds, time]);

    function handleStart() {
        var totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setTime(totalSeconds);
        setIsRunning(true);
    }

    function handleStop() {
        setIsRunning(false);
    }

    function handleReset() {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTime(0)
        setIsRunning(false);
    }



    function handleHoursChange(text) {
        setHours(text);
    }

    function handleMinutesChange(text) {
        setMinutes(text);
    }

    function handleSecondsChange(text) {
        setSeconds(text);
    }

    return (
        <View style={{ top: 200 }}>
            <View style={{ flexDirection: 'row', width: 395, justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center', left: 5 }}>{!language ? "Hours:" : "??????"}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={handleHoursChange}
                    value={hours.toString().replace(/[^0-9]/g, '')}
                />

                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center', left: 5 }}>{!language ? "Minutes:" : "??????"}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={handleMinutesChange}
                    value={minutes.toString().replace(/[^0-9]/g, '')}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center', left: 5 }}>{!language ? "Seconds:" : "??????"}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={handleSecondsChange}
                    value={seconds.toString().replace(/[^0-9]/g, '')}
                />
            </View>
            <View style={{ alignSelf: 'center' }}>
                <Text style={styles.timerText}>
                    {Math.floor(time / 3600)} {!language ? "hours:" : "?????????"} {Math.floor(time % 3600 / 60)} {!language ? "mins:" : "?????????"} {time % 60} {!language ? "secs:" : "??????"}
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>{!language ? "Start" : "??????"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStop}>
                <Text style={styles.buttonText}>{!language ? "Stop" : "??????"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>{!language ? "Reset" : "??????"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    button: {
        backgroundColor: '#FFAAAA',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    timerText: {
        fontSize: 24,
        margin: 10,
        textAlign: 'center',

    },
};

