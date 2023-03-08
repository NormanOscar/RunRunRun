import { useState} from 'react';
import { Text, View, Pressable, Dimensions, Permission } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from '../style/styles.js';


export default function RecordScreen({ navigation }) {

  const [show_Hide, setShowHide] = useState('flex');

  const letToggle = () => {
    if(show_Hide === 'flex') {
      setShowHide('none');
    } else {
      setShowHide('flex');
    }
  }
  const [record_Show_Hide, setRecordShowHide] = useState('none');

  const letToggleRecord = () => {
    if(record_Show_Hide === 'flex') {
      setRecordShowHide('none');
    } else {
      setRecordShowHide('flex');
    }
  }

  const [StoppedShowHide, setAlertShowHide] = useState('none');

  const toggleStoppedAlert = () => {
    if(StoppedShowHide === 'flex') {
      setAlertShowHide('none');
    } else {
      setAlertShowHide('flex');
    }
  }

  const [BtnShowHide, setBtnShowHide] = useState('flex');

  const toggleStoppedBtn = () => {
    if(BtnShowHide === 'flex') {
      setBtnShowHide('none');
    } else {
      setBtnShowHide('flex');
    }
  }

  const [time, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const startCountHandler = () => {
    let newIntervalId = setInterval(() => {
      setCount((time) => time + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  }

  const stopCounterHandler = () => {
    clearInterval(intervalId);
  }

  return (
    <View style={styles.container}>
      <View style={{
        flex: 1,
        display: show_Hide
        }}>
        <View style={styles.backBtn}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{fontSize:24, paddingLeft:20, color: 'rgb(59, 154, 226)'}}>Back</Text>
          </Pressable>
        </View>
        <View style={styles.map}>
          <MapView 
            style={{
              width: Dimensions.get('window').width,
              height: (Dimensions.get('window').height - 300)
            }} 
            initialRegion={{
              latitude: 56.8556858,
              longitude: 14.8290985,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
            mapType={'standard'}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            zoomEnabled={true}
            toolbarEnabled={true}
          />
        </View>
        <View style={styles.startBtnContainer}>
          <Pressable style={styles.startBtn} onPress={()=> {
            startCountHandler();
            letToggle();
            letToggleRecord();
          }}>
            <Text style={styles.startBtnText}>Start</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={{
        flex:1,
        display:record_Show_Hide
      }}>
        <View style={{
          paddingTop: 50,
          flex:0.9,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'rgb(59, 154, 226)',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: StoppedShowHide
          }}>
            <Text style={{
              fontSize: 20,
              paddingVertical: 10
            }}>Stopped</Text>
          </View>
          <View style={styles.recordFields}>
            <Text style={styles.recordHeaders}>TIME</Text>
            <Text style={styles.recordDigits}>{time}</Text>
          </View>
          <View style={styles.recordFields}>
            <Text style={styles.recordHeaders}>Distance (KM)</Text>
            <Text style={styles.recordDigits}>0.00</Text>
          </View>
          <View style={styles.recordFields}>
            <Text style={styles.recordHeaders}>AVG PACE (KM)</Text>
            <Text style={styles.recordDigits}>0.00</Text>
          </View>
          <View style={styles.finishBtnContainer}>
            <Pressable 
            style={[
              styles.finishBtn, 
              {
                backgroundColor: '#FF5F5F',
                display:BtnShowHide
              }
            ]} 
            onPress={()=> {
              stopCounterHandler();
              toggleStoppedAlert();
              toggleStoppedBtn();
            }}>
              <Text style={styles.finishBtnText}>Finish</Text>
            </Pressable>
            <View style={[
              styles.stoppedBtnContainer, 
              {
                flex: 0.6,
                flexDirection: 'row',
                display: StoppedShowHide
              }
              ]}>
              <Pressable style={[styles.stoppedBtns, styles.stoppedResumeBtn]} onPress={() => {
                startCountHandler();
                toggleStoppedAlert();
                toggleStoppedBtn();
              }}>
                <Text style={styles.stoppedBtnsText}>Resume</Text>
              </Pressable>
              <Pressable style={[styles.stoppedBtns, styles.stoppedFinishBtn]} onPress={() => navigation.navigate('Save', {runData: {time, distance: '3.56'}})}>
                <Text style={styles.stoppedBtnsText}>Finish</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}