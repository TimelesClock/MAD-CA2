import React, { useState } from 'react'
import { Alert, StyleSheet, View, Pressable, Text } from 'react-native'
import { supabase } from '../../supabase'
import { Button, Input } from 'react-native-elements'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const close = props.close
    async function signInWithEmail() {
        setLoading(true)
        await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
            .then(async ({ data, error }) => {
                if (error) {
                    Alert.alert(error.message)
                } else {
                    AsyncStorage.setItem("access_token", data.session.access_token)
                    AsyncStorage.setItem("email", data.user.email)
                    AsyncStorage.setItem("uuid", data.user.id)

                    await supabase.from("profiles").select("full_name")
                        .then(async ({ data }) => {

                            if (data[0].full_name) {
                                AsyncStorage.setItem("profileName", data[0].full_name)
                            } else {
                                await AsyncStorage.getItem("email")
                                    .then((value2) => {
                                        var end = value2.replace(/@.*$/, "")
                                        end = end.length < 7
                                            ? `${value2}`
                                            : `${value2.substring(0, 7)}...`
                                        AsyncStorage.setItem("profileName", end)
                                    })
                                    .catch((error) => {
                                        Alert.alert(error)
                                    })
                            }

                        })
                        .catch((error) => {
                            Alert.alert(error)
                        })

                    close()

                }

                setLoading(false)
            })
    }

    async function signUpWithEmail() {
        setLoading(true)
        await supabase.auth.signUp({
            email: email,
            password: password,
        })
            .then(({ data, error }) => {
                if (error) {
                    Alert.alert(error.message)
                } else {
                    AsyncStorage.setItem("access_token", data.session.access_token)
                    Alert.alert("Signup Successful!")
                }
                setLoading(false)

            })
    }

    return (
        <View>
            <Pressable
                style={{ alignSelf: "flex-start", flexDirection: "row" }}
                onPress={() => close()}>
                <AntDesign name="closecircle" size={24} color="black" />
                <Text style={{ marginLeft: 10 }}>Back</Text>
            </Pressable>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <Text style={[loading ? { opacity: 1 } : { opacity: 0 }]}>Loading...</Text>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})