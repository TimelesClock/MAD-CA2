// Name: Leong Yu Zhi Andy

// Admission Number: P2205865

// Class: DIT/FT/1B/02
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
