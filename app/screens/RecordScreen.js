import { useState } from 'react';
import { Text, View, Pressable, Dimensions, Permission } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from '../style/styles.js';
import useTimer from 'easytimer-react-hook';

export default function RecordScreen({ navigation }) {

  const [timer, isTargetAchieved] = useTimer();

  const [show_Hide, setShowHide] = useState('flex');

  const letToggle = () => {
    if (show_Hide === 'flex') {
      setShowHide('none');
    } else {
      setShowHide('flex');
    }
  }
  const [record_Show_Hide, setRecordShowHide] = useState('none');

  const letToggleRecord = () => {
    if (record_Show_Hide === 'flex') {
      setRecordShowHide('none');
    } else {
      setRecordShowHide('flex');
    }
  }

  const [StoppedShowHide, setAlertShowHide] = useState('none');

  const toggleStoppedAlert = () => {
    if (StoppedShowHide === 'flex') {
      setAlertShowHide('none');
    } else {
      setAlertShowHide('flex');
    }
  }

  const [BtnShowHide, setBtnShowHide] = useState('flex');

  const toggleStoppedBtn = () => {
    if (BtnShowHide === 'flex') {
      setBtnShowHide('none');
    } else {
      setBtnShowHide('flex');
    }
  }

  /* const handleUserLoction = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      alert(JSON.stringify(pos));
    })
  }

  handleUserLoction(); */
  return (
    <View style={styles.container}>
      <View style={{
        flex: 1,
        display: show_Hide
      }}>
        <View style={styles.backBtnContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Back</Text>
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
            showsMyLocationButton={true}
            showsCompass={true}
            zoomEnabled={true}
            toolbarEnabled={true}
          />
        </View>
        <View style={[styles.btnContainer, { flex: 0.4 }]}>
          <Pressable style={styles.btn} onPress={() => {
            timer.start();
            letToggle();
            letToggleRecord();
          }
          }>
            <Text style={styles.btnText}>Start</Text>
          </Pressable>
        </View>
      </View>

      <View style={{
        flex: 1,
        display: record_Show_Hide
      }}>
        <View style={styles.measureContainer}>
          <View style={[styles.stoppedAlert, { display: StoppedShowHide }]}>
            <Text style={styles.stoppedAlertText}>Stopped</Text>
          </View>
          <View style={styles.recordFields}>
            <Text style={styles.recordHeaders}>TIME</Text>
            <Text style={styles.recordDigits}>{timer.getTimeValues().toString()}</Text>
          </View>
          <View style={styles.recordFields}>
            <Text style={styles.recordHeaders}>Distance (KM)</Text>
            <Text style={styles.recordDigits}>0.00</Text>
          </View>
          <View style={styles.recordFields}>
            <Text style={styles.recordHeaders}>AVG PACE (KM)</Text>
            <Text style={styles.recordDigits}>0.00</Text>
          </View>
          <View style={[styles.btnContainer, { flex: 0.5 }]}>
            <Pressable
              style={[
                styles.btn, styles.FinishBtn,
                {
                  backgroundColor: '#FF5F5F',
                  display: BtnShowHide
                }
              ]}
              onPress={() => {
                timer.pause();
                toggleStoppedAlert();
                toggleStoppedBtn();
              }}>
              <Text style={styles.btnText}>Stop</Text>
            </Pressable>
            <View style={[
              styles.btnContainer,
              {
                paddingTop: 10,
                flexDirection: 'row',
                display: StoppedShowHide
              }
            ]}>
              <Pressable style={[
                styles.btn,
                {
                  backgroundColor: '#44fc00',
                  marginHorizontal: 10,
                  width: 180
                }
              ]}
                onPress={() => {
                  timer.start();
                  toggleStoppedAlert();
                  toggleStoppedBtn();
                }}>
                <Text style={styles.btnText}>Resume</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.btn,
                  {
                    backgroundColor: '#FF5F5F',
                    marginHorizontal: 10,
                    width: 180
                  }
                ]}
                onPress={() => navigation.navigate('Save', { runData: { time: timer.getTimeValues().toString(), distance: '3.56', avgPace: '5.50' } })}>
                <Text style={styles.btnText}>Finish</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}