import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Button, Pressable, Modal, TextInput, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

//Why does this feel like coding a DEUI prototype
const FileInput = () => {
    const [name, onChangeName] = React.useState();

    return (
        <SafeAreaView>
            <TextInput
                defaultValue=""
                style={styles.input}
                onChange={() => onChangeName(name)}
                selectTextOnFocus={true}
                value={name}
            />
        </SafeAreaView>
    )
}

function MoreModals(props) {
    const title = props.title
    const data = props.data
    const unshow = props.unshow
    const show = props.show
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                unshow();


            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                        style={{ alignSelf: "flex-start" }}
                        onPress={() => unshow()}>
                        <AntDesign name="closecircle" size={24} color="black" />
                    </Pressable>
                    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                    <Text style={{ padding: 50 }}>{data}</Text>
                </View>
            </View>
        </Modal>
    )
}

function Folder(props) {
    const [enabled, setEnabled] = React.useState(true)
    const [second, setSecond] = React.useState(10)
    const [filesModal, setFilesModal] = React.useState(false)
    const [folderModal, setFolderModal] = React.useState(false)
    const [Show, setShow] = React.useState(false)

    const folders = props.folders.map((obj) =>
        <Pressable style={{ marginHorizontal: 4 }} key={obj.name}>
            <Text style={{ marginLeft: 5 }}>{obj.name}</Text>
            <AntDesign name="folder1" size={180} color="black" />

        </Pressable>
    )
    const file = props.files.map((i) =>
        <>
            <MoreModals title={i.name} data={i.data} unshow = {()=> setShow(!Show)} show = {Show} />
            <Pressable onPress = {()=>{setShow(!Show)}} style={{ marginHorizontal: 4 }} key={i.name}>
                <View style={{ borderWidth: 1, width: 180, height: 180, alignContent: 'center' }}>
                    <Text style={{ alignSelf: "center", fontWeight: 'bold', fontSize: 20 }}>{i.name}</Text>
                    <Text numberOfLines={8} style={{ alignSelf: "center", padding: 8 }}>{i.data}</Text>
                </View>
            </Pressable>
        </>
    )

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filesModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setFilesModal(!filesModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={{ alignSelf: "flex-start" }}
                            onPress={() => setFilesModal(!filesModal)}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </Pressable>
                        <Text style={{ fontWeight: 'bold' }}>New Notes</Text>
                        <Text style={{ padding: 50, fontWeight: 'bold' }}>New Name:</Text>
                        <FileInput />
                        <Pressable onPress={() => { setFilesModal(!filesModal) }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={folderModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setFolderModal(!folderModal);

                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={{ alignSelf: "flex-start" }}
                            onPress={() => setFolderModal(!folderModal)}>
                            <AntDesign name="closecircle" size={24} color="black" />
                        </Pressable>
                        <Text style={{ fontWeight: 'bold' }}>New Collection</Text>
                        <Text style={{ padding: 50, fontWeight: 'bold' }}>New Name:</Text>
                        <FileInput />
                        <Pressable onPress={() => { setFolderModal(!folderModal) }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={{ margin: 15, flexDirection: "row", flexWrap: "wrap" }}>
                {folders}
                {file}
            </View>
            <Pressable onPress={() => { setFolderModal(!folderModal) }} disabled={enabled} style={{ alignSelf: 'flex-end', position: 'absolute', top: 460, right: 10, opacity: enabled ? 0 : 1 }}>
                <Feather name="folder-plus" size={60} color="black" />
            </Pressable>
            <Pressable onPress={() => { setFilesModal(!filesModal) }} disabled={enabled} style={{ alignSelf: 'flex-end', position: 'absolute', top: 530, right: 10, opacity: enabled ? 0 : 1 }}>
                <MaterialCommunityIcons name="note-plus-outline" size={60} color="black" />
            </Pressable>
            <Pressable onPress={() => {
                setEnabled(!enabled)

            }} style={{ alignSelf: 'flex-end', position: 'absolute', top: 600, right: 10 }}>
                <AntDesign name="pluscircle" size={60} color="black" />
            </Pressable>

        </>
    )
}





const MainStack = createNativeStackNavigator()

export default function NoteScreen(props) {

    return (
        <>
            <MainStack.Navigator screenOptions={{
                title: "",
                headerShown: false
            }}>
                <MainStack.Screen name="Main" children={() => <Folder files={props.files} folders={props.folders} />} />
            </MainStack.Navigator>
        </>
    )
}
//Gonna use Supabase in the future i guess for remote storage
var styles = {
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
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