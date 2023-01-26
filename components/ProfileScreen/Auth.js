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
            .then(({ data, error }) => {
                if (error) {
                    Alert.alert(error.message)
                }else{
                    AsyncStorage.setItem("access_token",data.session.access_token)
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
            .then(({ error }) => {
                if (error) Alert.alert(error.message)
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