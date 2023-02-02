// Name: Leong Yu Zhi Andy

// Admission Number: P2205865

// Class: DIT/FT/1B/02
import * as React from 'react';
import { Text, Pressable } from 'react-native';

import styles from './styles'


export default function DeleteCountDown(props) {
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