import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Text, View, Button, Pressable, Modal, TextInput, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import DeleteCountDown from '../components/ProfileScreen/DeleteCountdown'
import EmailInput from '../components/ProfileScreen/EmailInput'
import PasswordInput from '../components/ProfileScreen/PasswordInput'
import Auth from '../components/ProfileScreen/Auth'

import 'react-native-url-polyfill/auto'
import { supabase } from '../supabase'

function Profile(props) {
    const language = props.language
    const open = props.open
    const [login, setLogin] = React.useState(false)
    const [profileName, setProfileName] = React.useState()

    AsyncStorage.getItem("access_token")
        .then(async (value) => {
            if (value !== null) {
                setLogin(true)
                await supabase.from("profiles").select("full_name")
                    .then(({ data }) => {

                        if (data[0].full_name) {
                            setProfileName(data[0].full_name)
                        } else {
                            AsyncStorage.getItem("email")
                                .then((value2) => {
                                    end = value2.replace(/@.*$/, "")
                                    end = end.length < 7
                                    ? `${value2}`
                                    : `${value2.substring(0, 7)}...`
                                    setProfileName(end)
                                })
                        }

                    })
                    .catch((error) => {
                        Alert.alert(error)
                    })
            } else {
                setLogin(false)
            }
        })
        .catch((error) => {
            Alert.alert(error)
        })

    if (!login) {
        return (
            <>
                <Text style={{ marginLeft: 8, paddingBottom: 20 }}>{!language ? "You are not logged in!" : "你没有登录!"}</Text>
                <Pressable style={styles.button} onPress={() => open()}>
                    <Text style={{ fontWeight: "bold" }} >{!language ? "Login" : "登录"}</Text>
                </Pressable>
            </>
        )
    } else {
        return (
            <>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{}}>Profile Name: {profileName}</Text>
                <Pressable style={styles.button} onPress={async () => { await supabase.auth.signOut(); AsyncStorage.removeItem("access_token"); setLogin(!login) }}>
                    <Text style={{ fontWeight: "bold" }} >{!language ? "Logout" : "登录"}</Text>
                </Pressable>
            </>
        )
    }

}

export default function ProfileScreen(props) {
    const [LoginModal, setLoginModal] = React.useState(false);
    const [ResetModal, setResetModal] = React.useState(false);
    const language = props.language
    const rerender = props.rerender
    const [email, onChangeEmail] = React.useState()
    const [password, onChangePassword] = React.useState()

    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={LoginModal}
                onRequestClose={() => {
                    setLoginModal(!LoginModal);
                }}
            >
                <Auth close={() => { setLoginModal(!LoginModal) }} />
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={ResetModal}
                onRequestClose={() => {
                    setResetModal(!ResetModal);
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
                    <Profile language={language} open={() => { setLoginModal(true) }} />
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