import { useRoute } from '@react-navigation/native';
import { Text, View, Pressable, Dimensions, Modal } from 'react-native';
import { styles } from '../style/styles.js';
import { Entypo } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';

export default function RunScreen({ navigation }) {

  const route = useRoute();
  const runData = route.params?.runData;
  console.log(runData.positions);
  
  const [modalVisible, setModalVisible] = useState(false);
  
  const [allRuns, setAllRuns] = useState([]);
  
  const _map = useRef();
  useEffect(() => {
    (() => {
    
      runData.positions.map(position => {allRuns.push(position)});
      allRuns.pop();
      console.log(allRuns);

      _map.current.fitToCoordinates(runData.positions, {
        edgePadding: {
          top: 80,
          right: 80,
          bottom: 80,
          left: 80,
        },
        animated: true
      });
    })();
  }, []);

  const deleteRun = async () => {
    let savedData = [];
  
    try {
      savedData = JSON.parse(await AsyncStorage.getItem('savedData'));
    } catch (error) {}
    const currentRun = savedData.filter(run => run.runIndex == runData.runIndex );
    savedData.splice(currentRun.runIndex, 1);
    try {
      await AsyncStorage.setItem('savedData', JSON.stringify(savedData));
    } catch (error) {}
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
                  deleteRun();
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
      <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
        <View style={{ width: '90%', marginTop: 10 }}>
          <Text style={{ fontSize: 25, paddingBottom: 5 }}>{runData.name}</Text>
          <View style={styles.runDateTime}>
            <Entypo name="calendar" size={16} color="black" />
            <Text style={styles.runDateTimeText}>{runData.date} at {runData.startTime}</Text>
            <Entypo name="location-pin" size={16} color="black" />
            <Text style={styles.runDateTimeText}>{runData.startGeo}</Text>
          </View>
          {runData.desc != '' && (
            <View style={{marginTop: 20}}>
              <Text style={{fontSize:18, color: 'grey'}}>{runData.desc}</Text>
            </View>
          )}
        </View>
        <View style={{marginTop: 10, width:'100%', flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:18, marginHorizontal:20}}>How it felt:</Text>
            {runData.feeling == 'good' && (
            <Entypo name="emoji-happy" size={35} color="black" backgroundColor='#32cd32' />
            )}
            {runData.feeling == 'medium' && (
            <Entypo name="emoji-neutral" size={35} color="black" backgroundColor='#ffff00' />
            )}
            {runData.feeling == 'sad' && (
            <Entypo name="emoji-sad" size={35} color="black" backgroundColor='#FF5F5F' />
            )}
        </View>
        <View style={{ width: '100%', marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', width: '90%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingVertical: 10 }}>
              <Text style={{ fontSize: 20 }}>Time:</Text>
              <Text style={{ fontSize: 30, letterSpacing: 2 }}>{runData.duration}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingHorizontal: 30, paddingVertical: 10 }}>
              <View style={{ alignItems: 'center', width: 150 }}>
                <Text style={{ fontSize: 20 }}>Distance:</Text>
                <Text style={{ fontSize: 30, letterSpacing: 2 }}>{runData.distance} km</Text>
              </View>
              <View style={styles.verticleLine}></View>
              <View style={{ alignItems: 'center', width: 150 }}>
                <Text style={{ fontSize: 20 }}>Pace:</Text>
                <Text style={{ fontSize: 30, letterSpacing: 2 }}>{runData.avgPace} /km</Text>
              </View>
            </View>
            <View>
              <MapView
                style={{
                  width: 420,
                  height: 450
                }}
                ref={_map}
                provider={PROVIDER_GOOGLE}
                mapType={'standard'}
                showsCompass={true}
                zoomEnabled={true}
                showsBuildings={true}
              >
                <Polyline
                  coordinates={runData.positions}
                  strokeColor="rgb(59, 154, 226)"
                  strokeWidth={6}
                />
                <Marker
                  coordinate={runData.positions[0]}
                  title='Start'
                  icon={require('../assets/startIcon.png')}
                />
                <Marker 
                  coordinate={runData.positions[runData.positions.length - 1]}
                  title='End'
                  icon={require('../assets/finishIcon.png')}
                />
              </MapView>
            </View>
          </View>
        </View>
        <Pressable style={{position:'absolute', bottom:45}} onPress={() => setModalVisible(true)}>
          <Text style={styles.openModalBtn}>Delete run</Text>
        </Pressable>
      </View>
    </View>
  );
}