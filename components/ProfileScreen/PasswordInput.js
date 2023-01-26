import * as React from 'react';

import { TextInput, SafeAreaView } from 'react-native';
import styles from './styles'

export default function PasswordInput(props){
    const {password,onChangePassword} = props

    return (
        <SafeAreaView>
            <TextInput
                secureTextEntry={true}
                defaultValue=""
                style={styles.input}
                selectTextOnFocus={true}
                onChange={() => onChangePassword(password)}
                value={password}
            />
        </SafeAreaView>
    )
}