import * as React from 'react';
import { AsyncStorage } from 'react-native'
import { Text, View, Button, Pressable, Modal, TextInput, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const EmailInput = () => {
    const [email, onChangeEmail] = React.useState();

    return (
        <SafeAreaView>
            <TextInput
                defaultValue="example@gmail.com"
                style={styles.input}
                onChange={() => onChangeEmail(email)}
                selectTextOnFocus={true}
                value={email}
            />
        </SafeAreaView>
    )
}

const PasswordInput = () => {
    const [Password, onChangePassword] = React.useState();

    return (
        <SafeAreaView>
            <TextInput
                secureTextEntry={true}
                defaultValue=""
                style={styles.input}
                selectTextOnFocus={true}
                onChange={() => onChangePassword(Password)}
                value={Password}
            />
        </SafeAreaView>
    )
}

function DeleteCountDown() {
    var deleteEnabled = false
    const [second, setSecond] = React.useState(10)
    var text = "🔒"
    var timer = setTimeout(() => {
        setSecond(second - 1)
    }, 1000)

    if (second == 0) {
        text = "Confirm Deletion"
        deleteEnabled = true
        clearTimeout(timer)

    }
    return (
        <>
            <Text style={{ fontWeight: "bold", marginTop: 60 }}>Delete button will unlock in {second} seconds</Text>
            <Pressable disabled={deleteEnabled} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                <Text style={{ fontWeight: "bold", color: "black" }}>{text}</Text>
            </Pressable>
        </>
    )
}


export default function ProfileScreen() {
    const [LoginModal, setLoginModal] = React.useState(false);
    const [ResetModal, setResetModal] = React.useState(false);
    const [language, setLanguage] = React.useState(false)
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={LoginModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setLoginModal(!LoginModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={{ alignSelf: "flex-start" }}
                            onPress={() => setLoginModal(!LoginModal)}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </Pressable>
                        <Text style={{ alignSelf: "flex-start", padding: 10, fontWeight: "bold" }}>Email</Text>
                        <EmailInput />
                        <Text style={{ alignSelf: "flex-start", padding: 10, fontWeight: "bold" }}>Password</Text>
                        <PasswordInput />
                        <Pressable style={[styles.button, { backgroundColor: "#68AEFF", width: 180, marginTop: 50 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>Login</Text>
                        </Pressable>
                        <Pressable style={[styles.button, { backgroundColor: "#D4F1FB", width: 180, marginTop: 50 }]}>
                            <Text style={{ fontWeight: "bold", color: "#0094FF", textDecorationLine: 'underline' }}>Signup</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={ResetModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setLoginModal(!ResetModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={{ alignSelf: "flex-start" }}
                            onPress={() => setResetModal(!ResetModal)}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </Pressable>
                        <Text style={{ fontWeight: "bold" }}>Delete all data confirmation</Text>
                        <Text style={{ fontWeight: "bold", marginTop: 40 }}>All Collections and Notes will be deleted forever</Text>
                        <DeleteCountDown />

                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 2 }}>
                <Ionicons style={{ flex: 1 }} name="person-circle-outline" size={75} color="black" />
                <View style={{ flex: 2, paddingTop: Constants.statusBarHeight }}>
                    <Text style={{ marginLeft: 8, paddingBottom: 20 }}>You are not logged in!</Text>
                    <Pressable style={styles.button} onPress={() => setLoginModal(true)}>
                        <Text style={{ fontWeight: "bold" }} >Login</Text>
                    </Pressable>
                </View>

            </View>
            <View style={{ flex: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 30, paddingBottom: 40, paddingLeft: 20 }}>{!language ? "Settings" : "设置"}</Text>
                <View style={{}}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 40 }}>{!language ? "Theme" : "颜色主题"}</Text>
                    <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "space-evenly" }}>
                        <Pressable style={[styles.button, { backgroundColor: "#000000", width: 180 }]}>
                            <Text style={{ fontWeight: "bold", color: "white" }}>Dark</Text>
                        </Pressable>
                        <Pressable style={[styles.button, { backgroundColor: "#D9D9D9", width: 180 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>Light</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ paddingTop: 40 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 40 }}>{!language ? "Language" : "语言"}</Text>
                    <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "space-evenly" }}>
                        <Pressable onPress={() => {
                            setLanguage(!language)
                            _storeData = async () => {
                                try {
                                    await AsyncStorage.setItem(
                                        'language',
                                        language,
                                    );
                                } catch (error) {
                                    // Error saving data
                                }
                            };
                        }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180 }]}>
                            <Text style={[{ fontWeight: "bold", color: "black" }, !language ? { opacity: .5 } : { opacity: 1 }]}>English</Text>
                        </Pressable>
                        <Pressable onPress={() => { setLanguage(!language) }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180 }]}>
                            <Text style={[{ fontWeight: "bold", color: "black" }, language ? { opacity: .5 } : { opacity: 1 }]}>华文</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ paddingTop: 40 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 40 }}>{!language ? "Reset" : "重置"}</Text>
                    <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "space-evenly" }}>
                        <Pressable onPress={() => setResetModal(true)} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>{!language ? "Delete all data" : "删除所有数据"}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>


        </>
    )
}







var styles = {
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        overflow: "hidden",
        paddingVertical: 6,
        borderWidth: 1,
        backgroundColor: "#D9D9D9",
        width: 150
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