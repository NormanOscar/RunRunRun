import React from "react";
import { Text, View, Pressable, TextInput, Modal } from 'react-native';
import { styles } from '../style/styles.js';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SaveScreen({ navigation }) {
    const [modalVisible, setModalVisible] = React.useState(false);

    let allRunData = new Array();

    const [runName, setName] = React.useState('');
    const [runDesc, setDesc] = React.useState('');

    const route = useRoute();
    const runData = route.params?.runData;

    const saveData = async () => {
        runData.name = runName;
        runData.desc = runDesc;
        try {
            let savedData = await AsyncStorage.getItem('savedData');
            if (saveData != null) {
                allRunData = JSON.parse(savedData);
                allRunData.push(runData);
            }
            else {
                allRunData.push(runData);
            }
        } catch (error) {
            // Error retrieving data
        }
        try {
            await AsyncStorage.setItem('savedData', JSON.stringify(allRunData));
        } catch (error) {
            // Error saving data
        }

    }

    return (
        <View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible)}} 
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Do you want to delete this run?</Text>
                        <View style={{flexDirection:'row'}}>
                            <Pressable
                                style={[styles.button, styles.cancelBtn]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.deleteBtn]}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    navigation.navigate('Home');
                                }}>
                                <Text style={styles.textStyle}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.backBtn}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 24, paddingLeft: 20, color: 'rgb(59, 154, 226)' }}>Back</Text>
                </Pressable>
            </View>

            <View style={{
                alignItems: 'center',
                flex: 0.9
            }}>
                <Text style={{ fontSize: 30, paddingBottom: 20 }}>Save</Text>
                <TextInput
                    style={[styles.input, { height: 40 }]}
                    placeholder='Name'
                    onChangeText={(text) => setName(text)}
                    value={runName}
                />
                <TextInput
                    multiline={true}
                    style={[styles.input, { height: 80 }]}
                    placeholder='Description'
                    onChangeText={(text) => setDesc(text)}
                    value={runDesc}
                />
            </View>
            <View style={styles.finishBtnContainer}>
                <Pressable
                    style={[styles.finishBtn, { backgroundColor: 'rgb(59, 154, 226)' }]}
                    onPress={() => {
                        saveData();
                        navigation.navigate('Home');
                    }
                    }>
                    <Text style={styles.finishBtnText}>Save run</Text>
                </Pressable>

                <Pressable onPress={() => setModalVisible(true)}>
                    <Text style={{ fontSize: 24, color: '#FF5F5F', marginTop: 10 }}>Delete run</Text>
                </Pressable>
            </View>
        </View>
    );
}