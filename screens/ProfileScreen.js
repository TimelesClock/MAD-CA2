import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Button, Pressable, Modal, TextInput, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';




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

function DeleteCountDown(props) {
    const reset = props.reset
    const language = props.language
    var deleteEnabled = false
    var text = "🔒"
    const [second, setSecond] = React.useState(10)
    
    var timer = setTimeout(() => {
        setSecond(second - 1)
    }, 1000)

    if (second == 0) {
        text = !language ? "Confirm Deletion" : "确定删除"
        deleteEnabled = true
        clearTimeout(timer)

    }
    return (
        <>
            <Text style={{ fontWeight: "bold", marginTop: 60 }}>{!language ? ("Delete button will unlock in " + second + " seconds") : ("删除按钮将在 " + second + " 秒后解锁")}</Text>
            <Pressable onPress={() => { reset() }} disabled={!deleteEnabled} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                <Text style={{ fontWeight: "bold", color: "black" }}>{text}</Text>
            </Pressable>
        </>
    )
}


export default function ProfileScreen(props) {
    const [LoginModal, setLoginModal] = React.useState(false);
    const [ResetModal, setResetModal] = React.useState(false);
    const language = props.language
    const rerender = props.rerender


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
                        <Text style={{ fontWeight: "bold" }}>{!language ? "Delete all data confirmation" : "删除所有数据确认"}</Text>
                        <Text style={{ fontWeight: "bold", marginTop: 40 }}>{!language ? "All Collections and Notes will be deleted forever!" : "所有收藏和笔记将被永久删除!"}</Text>
                        <DeleteCountDown language={language} reset={() => {
                            setResetModal(!ResetModal)
                            AsyncStorage.setItem("language", (false).toString())
                                .catch((error) => {
                                    console.error(error)
                                })
                            rerender()
                        }} />

                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 2 }}>
                <Ionicons style={{ flex: 1 }} name="person-circle-outline" size={75} color="black" />
                <View style={{ flex: 2, paddingTop: Constants.statusBarHeight }}>
                    <Text style={{ marginLeft: 8, paddingBottom: 20 }}>{!language ? "You are not logged in!" : "你没有登录!"}</Text>
                    <Pressable style={styles.button} onPress={() => setLoginModal(true)}>
                        <Text style={{ fontWeight: "bold" }} >{!language ? "Login" : "登录"}</Text>
                    </Pressable>
                </View>

            </View>
            <View style={{ flex: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 30, paddingBottom: 40, paddingLeft: 20 }}>{!language ? "Settings" : "设置"}</Text>
                <View style={{}}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 40 }}>{!language ? "Theme" : "颜色主题"}</Text>
                    <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "space-evenly" }}>
                        <Pressable style={[styles.button, { backgroundColor: "#000000", width: 180 }]}>
                            <Text style={{ fontWeight: "bold", color: "white" }}>{!language ? "Dark" : "暗"}</Text>
                        </Pressable>
                        <Pressable style={[styles.button, { backgroundColor: "#D9D9D9", width: 180 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>{!language ? "Light" : "亮"}</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ paddingTop: 40 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 40 }}>{!language ? "Language" : "语言"}</Text>
                    <View style={{ flexDirection: "row", paddingTop: 20, justifyContent: "space-evenly" }}>
                        <Pressable onPress={() => {
                            AsyncStorage.setItem("language", (!language).toString())
                                .catch((error) => {
                                    console.error(error)
                                })
                            rerender()

                        }} disabled={!language} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180 }]}>
                            <Text style={[{ fontWeight: "bold", color: "black" }, !language ? { opacity: .5 } : { opacity: 1 }]}>English</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            AsyncStorage.setItem("language", (!language).toString())
                                .catch((error) => {
                                    console.error(error)
                                })
                            rerender()

                        }} disabled={language} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180 }]}>
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