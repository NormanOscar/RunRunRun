import React, { useEffect } from "react";
import { Text, View, Pressable, TextInput, Modal } from 'react-native';
import { styles } from '../style/styles.js';
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SaveScreen({ navigation }) {

  const [modalVisible, setModalVisible] = React.useState(false);

  const [runName, setName] = React.useState('');
  const [runDesc, setDesc] = React.useState('');

  const route = useRoute();
  const runData = route.params?.runData;
  
  useEffect(() => {
    const startHour = runData.startTime.split(':')[0];
    console.log(startHour);
    if (startHour >= 0 && startHour < 6) {
      setName('Morning run');
    }
    if (startHour >= 6 && startHour < 11) {
      setName('Morning run');
    }
    if (startHour >= 11 && startHour < 13) {
      setName('Lunch run');
    }
    if (startHour >= 13 && startHour < 18) {
      setName('Afternoon run');
    }
    if (startHour >= 18 && startHour < 24) {
      setName('Evening run');
    }
  })
  const saveData = async () => {
    let savedData = [];
    runData.name = runName;
    runData.desc = runDesc;
    try {
      savedData = JSON.parse(await AsyncStorage.getItem('savedData')) || [];
      savedData.push(runData);
      console.log(savedData);
    } catch (error) {
      // Error retrieving data
    }
    try {
      await AsyncStorage.setItem('savedData', JSON.stringify(savedData));
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
        onRequestClose={() => { setModalVisible(!modalVisible) }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to delete this run?</Text>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[styles.modalBtns, styles.cancelBtn]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={styles.modalBtnsText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtns, styles.deleteBtn]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('Home');
                }}>
                <Text style={styles.modalBtnsText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.backBtnContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Back</Text>
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
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor: 'rgb(59, 154, 226)'
            }
          ]}
          onPress={() => {
            saveData();
            navigation.navigate('Home');
          }
          }>
          <Text style={styles.btnText}>Save run</Text>
        </Pressable>

        <Pressable onPress={() => setModalVisible(true)}>
          <Text
            style={styles.openModalBtn}>Delete run</Text>
        </Pressable>
      </View>
    </View>
  );
}