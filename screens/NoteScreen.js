// Name: Leong Yu Zhi Andy

// Admission Number: P2205865

// Class: DIT/FT/1B/02

import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Button, Pressable, Modal, TextInput, SafeAreaView, Keyboard, ScrollView, LogBox, } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons, AntDesign, Feather, EvilIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute, useNavigation } from '@react-navigation/native';


LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

//Im sorry if components are grouped together but at this point, if it works it works


function TxtContent(props) {

    const route = useRoute()
    const language = route.params.language
    const [name,setName] = React.useState(route.params.name)
    const [data,setData] = React.useState(route.params.data)
    const iteration = route.params.iteration
    const fileData = route.params.fileData
    const setFileData = route.params.setFileData
    const folderData = route.params.folderData

    const setFolderData = route.params.setFolderData

    const folderIteration = route.params.folderIteration
    const navigation = useNavigation();
    const getData = route.params.getData



    React.useEffect(() => {
        navigation.setOptions({
            title: name,
            headerRight: () => (
                <FolderDelete2 />
            )
        })
    })

    function FolderDelete2() {
        const [show, setShow] = React.useState(false)
        const [filesModal, setFilesModal] = React.useState(false)
        const [fileName, onChangeFileName] = React.useState(name)
        const [txtData, onChangeTxtData] = React.useState(data)
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={filesModal}
                    onRequestClose={() => {
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
                            <Text style={{ fontWeight: 'bold' }}>{!language ? "Edit Notes" : "????????????"}</Text>
                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{!language ? "Title:" : "??????"}</Text>
                            <SafeAreaView>
                                <TextInput
                                    placeholder={name}
                                    style={styles.input}
                                    onChangeText={(text) => { onChangeFileName(text) }}
                                    selectTextOnFocus={true}
                                    value={fileName}
                                />
                            </SafeAreaView>
                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{!language ? "Content:" : "??????"}</Text>
                            <SafeAreaView>
                                <TextInput

                                    style={styles.input2}
                                    onChangeText={(text) => { onChangeTxtData(text) }}
                                    selectTextOnFocus={true}
                                    value={txtData}
                                    multiline={true}
                                    numberOfLines={10}
                                />
                            </SafeAreaView>
                            <Pressable onPress={async () => {
                                if (folderIteration !== null && folderIteration != undefined) {
                                    let temp = folderData
                                    temp[folderIteration].files[iteration].name = fileName
                                    temp[folderIteration].files[iteration].data = txtData
                                    setFolderData(temp)
                                }else{
                                    let temp = fileData
                                    temp[iteration].name = fileName
                                    temp[iteration].data = txtData
                                    setFileData(temp)
                                }
                                setName(fileName)
                                setData(txtData)
                                await AsyncStorage.setItem("notes",JSON.stringify({files:fileData,folders:folderData}))
                                getData()
                                setFilesModal(!filesModal)
                            }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                                <Text style={{ fontWeight: "bold", color: "black" }}>{!language ? "Submit" : "??????"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={show}
                    onRequestClose={() => {
                        setShow(false);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={{ alignSelf: "flex-start" }}
                                onPress={() => setShow(false)}>
                                <AntDesign name="closecircle" size={24} color="black" />
                            </Pressable>
                            <Pressable onPress={async () => {
                                setShow(false);
                                if (folderIteration !== null && folderIteration != undefined) {
                                    let tempFolder = folderData
                                    tempFolder[folderIteration].files.splice(iteration, 1)
                                    setFolderData(tempFolder)
                                } else {
                                    setFileData(fileData.splice(iteration, 1));
                                }
                                
                                await AsyncStorage.setItem("notes", JSON.stringify({ files: fileData, folders: folderData }));

                                getData()
                                navigation.pop()

                            }} style={[styles.button, { marginTop: 50 }]}>
                                <Text style={{ fontWeight: 'bold' }}>
                                {!language ? "Delete Confirmation" : "??????????????????"}
                                </Text>
                            </Pressable>

                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => { setFilesModal(!filesModal) }}>
                    <EvilIcons name="pencil" size={35} color="black" />
                </Pressable>
                <Pressable onPress={() => { setShow(!show) }}>
                    <Feather name="trash-2" size={24} color="black" />
                </Pressable>
            </>
        )
    }
    return (
        <>
            <ScrollView>
                <Text style={{ marginTop: 10 }}>{data}</Text>
            </ScrollView>

        </>
    )
}

function Child(props) {
    const route = useRoute()

    const language = route.params.language

    const folderIteration = route.params.folderIteration


    const [fileName, onChangeFileName] = React.useState();
    const getDataRe = route.params.getDataRe

    const parentFile = route.params.fileData

    const [folderData, setFolderData] = React.useState(route.params.folderData)
    const [fileData, setFileData] = React.useState(folderData[folderIteration].files)

    const [filesModal, setFilesModal] = React.useState(false)
    const navigation = useNavigation();

    React.useEffect(() => {
        navigation.setOptions({
            title: folderData[folderIteration].name,
            headerRight: () => (
                <FolderDelete />
            )
        })
    })

    function FolderDelete(props) {
        const [show, setShow] = React.useState(false)

        return (
            <>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={show}
                    onRequestClose={() => {
                        setShow(false);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={{ alignSelf: "flex-start" }}
                                onPress={() => setShow(false)}>
                                <AntDesign name="closecircle" size={24} color="black" />
                            </Pressable>
                            <Pressable onPress={async () => {
                                setShow(false);
                                let temp = folderData
                                temp.splice(folderIteration, 1)

                                await AsyncStorage.setItem("notes", JSON.stringify({ files: parentFile, folders: temp }));
                                getData()
                                getDataRe()
                                navigation.pop()

                            }} style={[styles.button, { marginTop: 50 }]}>
                                <Text style={{ fontWeight: 'bold' }}>
                                {!language ? "Delete Confirmation" : "??????????????????"}
                                </Text>
                            </Pressable>

                        </View>
                    </View>
                </Modal>
                <Pressable onPress={() => { setShow(!show) }}>
                    <Feather name="trash-2" size={24} color="black" />
                </Pressable>
            </>
        )
    }

    async function getData() {

        await AsyncStorage.getItem("notes")
            .then(response => {
                if (response) {

                    let obj = JSON.parse(response)
                    setFolderData(obj.folders)
                    if (folderData[folderIteration]) {
                        setFileData(folderData[folderIteration].files)
                    } else {
                        setFolderData([])
                    }

                }
            })
    }
    var file2
    if (!route.params || route.params.files.length == 0) {
        file2 = <></>
    } else {
        const data = fileData
        file2 = data.map((i, iteration) =>
            <View key={i.name + iteration.toString()}>
                <Pressable onPress={() => { navigation.push("TxtContent", { "name": i.name, "data": i.data, "folderIteration": folderIteration, "iteration": iteration, "getData": () => { getData(); getDataRe() }, "fileData": parentFile, "setFileData": setFileData, "folderData": folderData, "setFolderData": setFolderData }) }} style={{ marginHorizontal: 4, marginVertical: 5 }}>
                    <View style={{ borderWidth: 1, width: 200, height: 200, alignContent: 'center' }}>
                        <Text style={{ alignSelf: "center", fontWeight: 'bold', fontSize: 20 }}>{i.name}</Text>
                        <Text numberOfLines={8} style={{ alignSelf: "center", padding: 8 }}>{i.data}</Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filesModal}
                onRequestClose={() => {
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
                        <Text style={{ fontWeight: 'bold' }}>{!language ? "New Notes" : "?????????"}</Text>
                        <Text style={{ padding: 50, fontWeight: 'bold' }}>{!language ? "New Name:" : "?????????:"}</Text>
                        <SafeAreaView>
                            <TextInput
                                defaultValue=""
                                style={styles.input}
                                onChangeText={(text) => { onChangeFileName(text) }}
                                selectTextOnFocus={true}
                                value={fileName}
                            />
                        </SafeAreaView>
                        <Pressable onPress={async () => {
                            let temp = folderData
                            temp[folderIteration].files.push({ data: "", name: fileName })
                            setFolderData(temp)
                            await AsyncStorage.setItem("notes", JSON.stringify({ files: parentFile, folders: folderData }));
                            getData()
                            getDataRe()
                            setFilesModal(!filesModal)
                        }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>{!language ? "Submit" : "??????"}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView style={{ margin: 15, flexDirection: "row", flexWrap: "wrap" }}>
                {file2}
            </ScrollView>
            <Pressable onPress={() => { setFilesModal(!filesModal) }} style={{ alignSelf: 'flex-end', position: 'absolute', top: 530, right: 10 }}>
                <MaterialCommunityIcons name="note-plus-outline" size={60} color="black" />
            </Pressable>
        </>
    )
}


function Folder(props) {
    const [enabled, setEnabled] = React.useState(true)
    const [filesModal, setFilesModal] = React.useState(false)
    const [folderModal, setFolderModal] = React.useState(false)
    const navigation = useNavigation();
    const route = useRoute()

    const [fileName, onChangeFileName] = React.useState("");
    const [folderName, onChangeFolderName] = React.useState("");

    const [folderData, setFolderData] = React.useState([])
    const [fileData, setFileData] = React.useState([])
    
    const [language, setLanguage] = React.useState(false)
    AsyncStorage.getItem("language")
        .then((value) => {
            setLanguage(value === 'true')
        })
        .catch((error) => {
            console.error(error)
        })

    async function getData() {
        await AsyncStorage.getItem("notes")
            .then(response => {
                if (response) {
                    let obj = JSON.parse(response)
                     setFolderData(obj.folders)
                     setFileData(obj.files)
                }
            })
    }
    React.useEffect(() => {
        getData()
    }, [])
    // getData()


    var folders
    var file
    if (!folderData) {
        folders = <></>
    } else {
        folders = folderData.map((obj, iteration) =>
            <Pressable onPress={() => {
                navigation.push("Child", { "language":language,"files": obj.files, "folderIteration": iteration, "getDataRe": () => { getData() }, "fileData": fileData, "setFileData": setFileData, "folderData": folderData, "setFolderData": setFolderData })
            }} style={{ marginHorizontal: 4 }} key={iteration}>
                <Text style={{ marginLeft: 5 }}>{obj.name}</Text>
                <AntDesign name="folder1" size={200} color="black" />

            </Pressable>
        )
    }
    if (!fileData) {
        file = <></>
    } else {
        file = fileData.map((i, iteration) =>
            <View key={i.name + iteration.toString()}>
                <Pressable onPress={() => { navigation.push("TxtContent", { "language":language,"name": i.name, "data": i.data, "iteration": iteration, "getData": () => { getData() }, "fileData": fileData, "setFileData": setFileData, "folderData": folderData }) }} style={{ marginHorizontal: 4, marginVertical: 5 }}>
                    <View style={{ borderWidth: 1, width: 200, height: 200, alignContent: 'center' }}>
                        <Text style={{ alignSelf: "center", fontWeight: 'bold', fontSize: 20 }}>{i.name}</Text>
                        <Text numberOfLines={8} style={{ alignSelf: "center", padding: 8 }}>{i.data}</Text>
                    </View>
                </Pressable>
            </View>
        )
    }



    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={filesModal}
                onRequestClose={() => {
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
                        <Text style={{ fontWeight: 'bold' }}>{!language ? "New Notes" : "?????????"}</Text>
                        <Text style={{ padding: 50, fontWeight: 'bold' }}>{!language ? "New Name" : "?????????"}</Text>
                        <SafeAreaView>
                            <TextInput
                                defaultValue=""
                                style={styles.input}
                                onChangeText={(text) => { onChangeFileName(text) }}
                                selectTextOnFocus={true}
                                value={fileName}
                            />
                        </SafeAreaView>
                        <Pressable onPress={async () => {
                            let temp = fileData
                            temp.push({ data: "", name: fileName })
                            setFileData(temp)
                            await AsyncStorage.setItem("notes", JSON.stringify({ files: fileData, folders: folderData }));
                            getData()
                            onChangeFileName("")
                            setFilesModal(!filesModal)
                        }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>{!language ? "Submit" : "??????"}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={folderModal}
                onRequestClose={() => {
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
                        <Text style={{ fontWeight: 'bold' }}>{!language ? "New Collection" : "??????"}</Text>
                        <Text style={{ padding: 50, fontWeight: 'bold' }}>{!language ? "New Name" : "?????????"}</Text>
                        <SafeAreaView>
                            <TextInput
                                defaultValue=""
                                style={styles.input}
                                onChangeText={(text) => { onChangeFolderName(text) }}
                                selectTextOnFocus={true}
                                value={folderName}
                            />
                        </SafeAreaView>
                        <Pressable onPress={async () => {

                            let temp = folderData
                            temp.push({ files: [], name: folderName })
                            onChangeFolderName("")
                            await AsyncStorage.setItem("notes", JSON.stringify({ files: fileData, folders: folderData }));
                            getData()
                            setFolderModal(!folderModal)
                        }} style={[styles.button, { backgroundColor: "#D9D9D9", width: 180, marginVertical: 60 }]}>
                            <Text style={{ fontWeight: "bold", color: "black" }}>{!language ? "Submit" : "??????"}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <ScrollView style={{ margin: 15, flexDirection: "row", flexWrap: "wrap" }} >
                {folders}
                {file}
            </ScrollView>
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

            }}>
                <MainStack.Screen options={{ headerShown: false }} name="Main" children={() => <Folder files={props.files} folders={props.folders} />} />
                <MainStack.Screen options={{ title: "Folder" }} name="Child" component={Child} />
                <MainStack.Screen options = {{title: "Text Content"}} name="TxtContent" component={TxtContent} />
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
    input2: {
        width: 300,
        height: 300,
        margin: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'top'
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