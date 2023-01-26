import * as React from 'react';

import { TextInput, SafeAreaView } from 'react-native';
import styles from './styles'

export default function EmailInput(props) {
    const {email,changeEmail} = props

    return (
        <SafeAreaView>
            <TextInput
                defaultValue="example@gmail.com"
                style={styles.input}
                onChange={() => changeEmail(email)}
                selectTextOnFocus={true}
                value={email}
            />
        </SafeAreaView>
    )
}
