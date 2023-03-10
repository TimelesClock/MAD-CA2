// Name: Leong Yu Zhi Andy

// Admission Number: P2205865

// Class: DIT/FT/1B/02
import * as React from 'react';
import { supabase } from '../../supabase'
import { View, TextInput, SafeAreaView, Pressable, Text } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styles from './styles'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangeName(props) {
    const [Name, onChangeName] = React.useState('')
    const close = props.close
    const language = props.language
    const login = props.login


    return <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable
                style={{ alignSelf: "flex-start" }}
                onPress={() => close()}>
                <AntDesign name="closecircle" size={24} color="black" />
            </Pressable>
            <Text style={{ fontWeight: "bold" }}>{!language ? "Change profile Name" : "更改个人资料名称"}</Text>
            <SafeAreaView>
                <TextInput
                    defaultValue="Your Name"
                    style={styles.input}
                    onChangeText={(text) => { onChangeName(text) }}
                    selectTextOnFocus={true}
                    value={Name}
                />
            </SafeAreaView>
            <Pressable style={styles.button} onPress={async () => {
                if (login) {

                    AsyncStorage.getItem("uuid")
                        .then(async (uuid) => {
                            await supabase.from("profiles").update({ full_name: Name }).eq('id', uuid)
                                .then(() => {
                                    AsyncStorage.setItem("profileName", Name)
                                    close()
                                })
                                .catch((error) => {
                                    Alert.alert(error)
                                })
                        })

                } else {
                    AsyncStorage.setItem("profileName", Name)
                    close()
                }
                
            }}>
                <Text>{!language ? "Confirm" : "确认"}</Text>
            </Pressable>

        </View>
    </View>
}

