import { useState } from 'react';
import { Text, View, Pressable, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from '../style/styles.js';
import { useRoute } from "@react-navigation/native";
import useTimer from 'easytimer-react-hook';
import { format } from 'date-fns';

export default function RecordScreen({ navigation }) {

  const location = useRoute().params?.location;

  const [mapRegion, setmapRegion] = useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008
  });

  const [timer, isTargetAchieved] = useTimer();
  const [timerState, setTimerState] = useState('stopped');
  timer.addEventListener('started', () => {setTimerState('running')});
  timer.addEventListener('paused', () => {setTimerState('paused')});

  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();

  const setDate = () => {
    const date = new Date();
    setStartDate(format(date, "dd MMMM yyyy"));
    setStartTime(format(date, "HH:mm"));
  }
  return (
    <View style={styles.container}>
      {timerState == 'stopped' && (
        <View style={{
          flex: 1,
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
              provider={ PROVIDER_GOOGLE } 
              initialRegion={mapRegion}
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
              setDate();
            }
            }>
              <Text style={styles.btnText}>Start</Text>
            </Pressable>
          </View>
        </View>
      )}
      {['paused', 'running'].includes(timerState) && (
        <View style={{
          flex: 1,
        }}>
          <View style={styles.measureContainer}>
            {timerState == 'paused' && (
              <View style={styles.stoppedAlert}>
                <Text style={styles.stoppedAlertText}>Stopped</Text>
              </View>
            )}
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
              <Text style={styles.recordDigits}>0:00</Text>
            </View>
            <View style={[styles.btnContainer, { flex: 0.5 }]}>
              {timerState == 'running' && (
                <Pressable
                  style={[
                    styles.btn, styles.FinishBtn,
                    {
                      backgroundColor: '#FF5F5F',
                    }
                  ]}
                  onPress={() => {
                    timer.pause();
                  }}>
                  <Text style={styles.btnText}>Stop</Text>
                </Pressable>
              )}
              {timerState == 'paused' && (
                <View style={[
                  styles.btnContainer,
                  {
                    paddingTop: 10,
                    flexDirection: 'row'
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
                    onPress={() => navigation.navigate('Save', { runData: {date: startDate, startTime: startTime, duration: timer.getTimeValues().toString(), distance: '3.56', avgPace: '5:50' } })}>
                    <Text style={styles.btnText}>Finish</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}